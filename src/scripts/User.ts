import * as bcrypt from 'bcrypt';
import DBConnection from "./DBConnection";
import Character from "./Character";
import {IDatabase} from "pg-promise";


export default class User {
    get char(): Character[] {
        return this._char;
    }
    get user_id(): number {
        return this._user_id;
    }

    set user_id(value: number) {
        this._user_id = value;
    }

    set username(value: string) {
        this._username = value;
    }

    get username(): string {
        return this._username!;
    } 

    set email(value: string) {
        this._email = value;
    }

    set password(value: string) {
        this._password = value;
    }
    private db: IDatabase<unknown>;
    private _user_id!: number;
    private _username: string | undefined;
    private _email: string | undefined;
    private _password: string;
    private _char : Character[]=[];

    constructor(usernameOrEmail: string = '', password: string = '', username: string = '', email: string = '') {
        this.db = DBConnection.getInstance().getDB();
        if (usernameOrEmail.includes('@')) {
            this._email = usernameOrEmail;
        } else {
            this._username = usernameOrEmail;
        }
        this._password = password;
    }

    async login() {
        try {
            await this.db.tx(async (t) => {
                let query;
                let values;

                if (this._email) {
                    query = 'SELECT * FROM accounts WHERE email = $1';
                    values = [this._email];
                } else if (this._username) {
                    query = 'SELECT * FROM accounts WHERE username = $1';
                    values = [this._username];
                } else {
                    console.error('No username or email provided for login.');
                    throw new Error('No username or email provided for login.');
                }

                const userData = await t.oneOrNone(query, values);

                if (!userData) {
                    console.error('User not found.');
                    throw new Error('User not found.');
                }

                const passwordMatch = await bcrypt.compare(this._password, userData.password);

                if (passwordMatch) {
                    this._user_id = userData.user_id;
                    this._email = userData.email;
                    this._username = userData.username;

                    await t.none('UPDATE accounts SET last_login = NOW() WHERE user_id = $1', [userData.user_id]);

                    console.log('Login successful.');
                } else {
                    console.error('Invalid username or password.');
                    throw new Error('Invalid username or password.');
                }
            });
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    }

    async regis(username: string, email: string, password: string) {
        try {
            const existingUser = await this.db.oneOrNone('SELECT * FROM accounts WHERE username = $1 OR email = $2', [username, email]);

            if (existingUser) {
                console.error('User already exists.');
                throw new Error('User already exists.');
            }

            if (
                email.length < 5 ||                     // Minimum length of 5 characters
                email.indexOf('@') === -1 ||             // Check for the presence of '@'
                email.lastIndexOf('.') === -1 ||         // Check for the presence of a dot ('.')
                email.lastIndexOf('.') < email.indexOf('@') ||  // Check if dot comes after '@'
                email.lastIndexOf('.') - email.indexOf('@') === 1  // Check if there's at least one character between '@' and '.'
            ) {
            console.error('Invalid email.');
            throw new Error('Invalid email.');
            }


            if (password.length < 8 ||
                !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password) ||
                !/[A-Z]/.test(password) ||
                !/[a-z]/.test(password) ||
                !/\d/.test(password)) {
                console.error('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one special character, and one number.');
                throw new Error('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one special character, and one number.');
            }
            console.log(password);
            const hashedPassword = await bcrypt.hash(password, 10);
            await this.db.tx(async (t) => {
                const query = 'INSERT INTO accounts (username, email, password, created_on) VALUES ($1, $2, $3, NOW())';
                const values = [username, email, hashedPassword];

                await t.none(query, values);

                console.log('User registered successfully!');
            });
        } catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }
    }



    async getCharacters(user_id: number) {
        try {
            if(!this.user_id){
                console.error('User not logged in.');
                throw new Error('User not logged in.');
            }
            await this.db.tx(async (t) => {
                const query = 'SELECT user_id, cha_id FROM characters WHERE user_id = $1';

                const charData = await t.manyOrNone(query, user_id);

                if (charData && charData.length > 0) {
                    const getCharPromises = charData.map((cha) => {
                        const temp = new Character(cha.user_id);
                        temp.char_id = cha.cha_id;
                        return temp.getChar().then(() => temp);
                    });

                    this._char = await Promise.all(getCharPromises);

                    console.log('Character data loaded successfully.');
                } else {
                    console.log('This user has no character.');
                }
            });
        } catch (error) {
            console.error(error);
            throw error;
            }
    }

}
