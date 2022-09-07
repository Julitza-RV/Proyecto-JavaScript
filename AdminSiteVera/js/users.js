window.addEventListener('load', () => {

    const app = Vue.createApp({
        data() {
            return {
                users: [],
                user: {
                    id:'',
                    name:'',
                    state:'',
                    email:'',
                    contrasenia:''

                },
                operation: "Register",
            
            }
        },
        created() {
            if (localStorage.getItem('pk.users') !== null) {
                this.users = JSON.parse(localStorage.getItem('pk.users'));
            } else {
                this.listUsers();
            }
        },
        mounted() {
            this.$refs.name.focus();
        },
        methods: {
            listUsers: async function () {
                const res = await fetch('https://appgizlorecords.herokuapp.com/api/es/usuario/empresa/v1/1');
                const data = await res.json();
                console.log(data)
                this.users = data.slice(0, 10);
                this.updateLocalStorage();
            },
            updateLocalStorage: function () {
                localStorage.setItem('pk.users', JSON.stringify(this.users));
            },
            processUser: function (event) {
                event.preventDefault();
                if (this.operation === "Register") {
                    
                    this.users.push({
                        id:this.user.id,
                        name:this.user.name,
                        state:this.user.state,
                        email:this.user.email,
                        contrasenia:this.user.contrasenia
                    });
                } else {
                    this.users[this.userIndex].name = this.user.name;
                    this.users[this.userIndex].state = this.user.state;
                    this.users[this.userIndex].email = this.user.email;
                    this.users[this.userIndex].contrasenia = this.user.contrasenia;
                }
                this.updateLocalStorage();
                // this.findMaxId();
                this.clearFields();
            },
            // findMaxId: function () {
            //     const maxId = Math.max.apply(Math, this.users.map(function (user) {
            //         return user.id;
            //     }));
            //     return maxId;
            // },
            editUser(id) {
                this.operation = "Update";
                const userFound = this.users.find((user, index) => {
                    this.userIndex = index;
                    return user.id === id;
                });
                this.user.name = userFound.name;
                this.user.state = userFound.state;
                this.user.email = userFound.email;
                this.user.contrasenia = userFound.contrasenia;
            },
            deleteUser: function (id, event) {
                const confirmation = confirm('¿Desea eliminar el usuario?');
                if (confirmation) {
                    this.users = this.users.filter(user => user.id !== id);
                    this.updateLocalStorage();
                } else {
                    event.preventDefault();
                }
            },
            clearFields: function () {
                this.user.id = "";
                this.user.name = "";
                this.user.state = "";
                this.user.email = "";
                this.user.contrasenia = "";
                this.operation = "Register";
                this.$refs.name.focus();
            }
        }
    });

    app.mount('#app');

});