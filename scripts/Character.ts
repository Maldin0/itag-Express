import Race from "./Race";
import Class from "./Class";
import Skill from "./Skill";
import Item from "./Item";

import DBConnection from "./DBConnection";
import {IDatabase} from "pg-promise";




export default class Character {
    private _char_id! : number;
    set char_id(value: number) {
        this._char_id = value;
    }
    private db: IDatabase<unknown>;

    user_id : number | undefined;
    race : Race | undefined;
    class : Class | undefined;
    name : string | undefined;
    gold : number | undefined;
    skills : Skill[] = [];
    bag : Item[] = [];
    status : {
        dex: number;
        wis: number;
        int: number;
        str: number;
        cha: number;
        con: number;
        hp: number;
    } = {
        dex: 0,
        wis: 0,
        int: 0,
        str: 0,
        cha: 0,
        con: 0,
        hp: 0
    };
    background : string | undefined;
    active : boolean | undefined;
    
    constructor(user_id: number){
        this.db = DBConnection.getInstance().getDB();
        this.user_id = user_id;
    }

    async createChar(race_id: number,class_id: number,name: string, background: string,dex: number,wis: number, int: number, str: number, cha: number, con: number, hp: number, gold: number){
        if(!this.user_id){
            console.log('User not found.')
            return
        }
        try{
            await this.db.tx(async (t)=>{
                const query = 'insert into characters(user_id,race_id,class_id,name,background,dex,wis,int,str,cha,con,hp,is_active,gold) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12, true ,$13) returning cha_id'
                const value = [this.user_id,race_id, class_id, name, background,dex,wis,int,str,cha,con,hp, gold]
                const Chadata = await t.one(query,value)
                this.active = true;
                this._char_id = Chadata.cha_id;
                console.log('Create character successfully.')
            })
        }
        catch(error){
            console.error(error)
        }
    }

    async getChar(){
        if(!this.user_id){
            console.log('User not found.')
            return
        }
        try{
            await this.db.tx(async (t)=>{
                const query = 'select name,gold,background,is_active from characters where cha_id = $1' 
                const Chadata = await t.one(query,[this.char_id])
                this.name = Chadata.name
                this.gold = Chadata.gold
                this.background = Chadata.background
                this.active = Chadata.is_active

                const query2 = 'select race_name from characters natural join races where cha_id = $1'
                const Racedata = await t.one(query2,[this.char_id])
                this.race = new Race(Racedata.race_name)
                await this.race.getTrait()

                const query3 = 'select class_name from characters natural join classes where cha_id = $1'
                const Classdata = await t.one(query3,[this.char_id])
                this.class = new Class(Classdata.class_name)
                await this.class.getfeature()
                await this.class.getspell()

                const query4 = 'select skill_name,skill_detail from characters natural join  skills_in_cha natural join skills where cha_id = $1'
                const Skilldata = await t.manyOrNone(query4,[this.char_id])
                for(const skill of Skilldata){
                    this.skills.push(new Skill(skill.skill_name,skill.skill_detail))
                }

                const query5 = 'select item_name,item_detail from characters natural join  inventories natural join items where cha_id = $1'
                const Itemdata = await t.manyOrNone(query5,[this.char_id])
                for(const item of Itemdata){
                    this.bag.push(new Item(item.item_name,item.item_detail))
                }

                const query6 = 'select dex,wis,int,str,cha,con,hp from characters where cha_id = $1'
                const Statdata = await t.one(query6,[this.char_id])
                this.status.dex = Statdata.dex
                this.status.wis = Statdata.wis
                this.status.int = Statdata.int
                this.status.str = Statdata.str
                this.status.cha = Statdata.cha
                this.status.con = Statdata.con
                this.status.hp = Statdata.hp
                console.log('Get character successfully.')
            })
            
        }
        catch(error){
            console.error(error)
        }
    }

    get char_id() {
        return this._char_id
    }

    async toString() {
        // TODO: Convert to string
        await this.getChar()

        const characterInfo = `Character ID: ${this.char_id}
        User ID: ${this.user_id}
        Name: ${this.name}
        Race: ${this.race?.name || 'N/A'}
        Class: ${this.class?.name || 'N/A'}
        Background: ${this.background || 'N/A'}
        Gold: ${this.gold || 0}
        Skills: ${this.skills.map(skill => `${skill.name}: ${skill.details}`).join(', ') || 'N/A'}
        Items in Bag: ${this.bag.map(item => `${item.name}: ${item.detail}`).join(', ') || 'N/A'}
        Dexterity: ${this.status.dex || 0}
        Wisdom: ${this.status.wis || 0}
        Intelligence: ${this.status.int || 0}
        Strength: ${this.status.str || 0}
        Charisma: ${this.status.cha || 0}
        Constitution: ${this.status.con || 0}
        HP: ${this.status.hp || 0}`;

        return characterInfo
        //return this.user_id, this.race, this.class, this.name, this.gold, this.skills, this.bag, this.status.cha, this.status.con, this.status.wis, this.status.str, this.status.int, this.status.dex, this.status.hp
    }
}   