const fs = require('fs');
const path = require('path');

class ChatDataProvider{
    constructor(){
        this._cache = null;
        this._dataFilePath = path.join(__dirname, '..','..','data','chats.json');
    }

    async getChats(){
        if(this._cache) return this._cache;
        try{
            fs.accessSync(this._dataFilePath);
        }catch{
            this._cache = [];
            return this._cache;
        }
        const file$ = fs.createReadStream(
            this._dataFilePath,
            {encoding: 'utf-8'} 
        );

        const data = await new Promise((res,rej) =>{
            let result = '';
            file$.on('data', data =>{
                result += data;
            });

            file$.on('end', () =>{
                res(result);
            });

            file$.on('error', rej);
        });
        this._cache = JSON.parse(data);
        return this._cache;
    }

    async getChat(chatId){
        
        if(!this._cache){
            this._cache = await this.getChats();
        }
        chatId = +chatId;                                           //to number
        return this._cache.find(({ id }) => id === chatId );
    }

    async setChat(chat){
        if(!this._cache){
            this._cache = await this.getChats();
        }
        if (chat.id) {
            this._cache = this._cache.map(e => {
                return e.id === chat.id ? chat : e;
            });
        } else {
            chat = {
                id: Date.now(),
                ...chat
            };
            this._cache.push(chat);
        }
        const file$ = fs.createWriteStream(
            this._dataFilePath,
            {encoding: 'utf-8'}
        );

        file$.end(JSON.stringify(this._cache));

        return chat;
    }

    async deleteChat(chatId) {
        if(!this._cache){
            this._cache = await this.getChats();
        }
        chatId = +chatId;                                           //to number
        this._cache = this._cache.filter(({ id }) => id !== chatId);
        const file$ = fs.createWriteStream(
            this._dataFilePath,
            {encoding: 'utf-8'}
        );

        file$.end(JSON.stringify(this._cache));
    }
}

const chatsProvider = new ChatDataProvider();

module.exports = chatsProvider;