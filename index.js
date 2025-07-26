const TelegramBot = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options')

const token = "8029290695:AAGTyHz3WJard5pGLr8mq_EV7y0tPpyKuig";

const bot = new TelegramBot(token, { polling: true })


const obj = {};





const startGame = async(chatId) => {
    await bot.sendMessage(chatId, "kompyuter 0 dan 9 gacha son o'yladi, siz osha sonni topishga harakat qiling")
            const randomNumber = Math.floor(Math.random() * 10)
            obj[chatId] = randomNumber;
            return bot.sendMessage(chatId, "tog'ri sonni toping", gameOptions)
}

const bootstrap = () => {
    bot.setMyCommands([
        {
            command: '/start',
            description: 'bot haqida malumot'
        },
        {
            command: '/info',
            description: 'ozingiz haqingizda malumot'
        },
        {
            command: '/game',
            description: 'oyin boshlash'
        }
    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === "/start") {
            return bot.sendMessage(chatId, `Assalomu aleykom xurmatli ${msg.from?.first_name}`)
        }
        if (text === "/info") {
            await bot.sendSticker(chatId, "https://tlgrm.eu/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/5.webp")
            return bot.sendMessage(chatId, `Sizning telegram username ${msg.from?.username}, sizning ismingiz esa ${msg.from?.first_name} ${msg.from?.last_name}`)
        }

        if (text === "/game") {
            return startGame(chatId)
        }

        bot.sendMessage(chatId, "uzur men sizning gapizga tushunmayabman")
    })

    bot.on('callback_query', msg => {
        const data = msg.data
        const chatId = msg.message.chat.id;

        if(data === '/again') {
            return startGame(chatId)
        }

        if (data == obj[chatId]) {
            return bot.sendMessage(chatId, `Tabriklaymiz siz tog'ri javob berdingiz, kompyuter ${obj[chatId]} sonini tanlagan edi`)
        }
        else {
            bot.sendMessage(chatId, `Siz notog'ri son tanladingiz, tanlagan soningiz ${data}, kompyuter ${obj[chatId]} sonini tanlagan edi`, againOptions)
        }
    })
}
bootstrap()