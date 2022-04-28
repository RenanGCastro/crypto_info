const { Telegraf } = require('telegraf')
const bot = new Telegraf('5398872467:AAElFQhRI1ddRn7MvBebjk17WzbgrNQ9HXo')

//descobrir id canal
//https://api.telegram.org/bot5398872467:AAElFQhRI1ddRn7MvBebjk17WzbgrNQ9HXo/getUpdates
//bot.telegram.sendMessage(-1001526822620, 'bot mandou')

//telegraf
//https://telegraf.js.org/

//cron
//https://www.npmjs.com/package/cron

//trade-indicator
//https://github.com/thanhnguyennguyen/trading-indicator


module.exports = {
    ...require('./indicators/bollinger_band.js'),
    ...require('./indicators/ema.js'),
    ...require('./indicators/ichimoku.js'),
    ...require('./indicators/macd.js'),
    ...require('./indicators/mfi.js'),
    ...require('./indicators/obv.js'),
    ...require('./indicators/rsi.js'),
    ...require('./indicators/sma.js'),
    ...require('./indicators/stochasticrsi.js'),
    ...require('./indicators/ticker.js'),
    ...require('./indicators/wma.js'),
    ...require('./alerts/index.js'),
    ...require('./indicators/atr.js'),
    ...require('./indicators/adx.js'),
}


const info_crypto = async (crypto, tempo) => {
    try {

        let mensagem = ''
        mensagem = 'Crypto: ' + crypto

        console.log('RSI')
        let rsi = await module.exports.rsiCheck(6, 75, 25, 'binance', crypto, tempo, true)
        rsi = rsi.rsiVal
        console.log(rsi)

        mensagem = mensagem + '\nRSI: ' + rsi
        if (rsi > 70) {
            mensagem = mensagem + ' - Sobrecomprado'
        }
        if (rsi < 30) {
            mensagem = mensagem + ' - Sobrevendido'
        }

        console.log('MFI')
        let mfi = await module.exports.mfi(6, 'binance', crypto, tempo, true)
        mfi = mfi[mfi.length - 1]
        console.log(mfi)

        mensagem = mensagem + '\nMFI: ' + mfi

        if (mfi > 70) {
            mensagem = mensagem + ' - Sobrecomprado'
        }
        if (mfi < 30) {
            mensagem = mensagem + ' - Sobrevendido'
        }

        // console.log('MACD')
        // let macdData = await module.exports.macd(12, 26, 9, 'close', 'binance', crypto, tempo, true)
        // let macd_histograma = macdData[macdData.length - 1].histogram
        // macd_histograma = (Math.round(macd_histograma * 100) / 100).toFixed(2)
        // console.log(macd_histograma)

        // mensagem = mensagem+'\nMACD Histograma: '+macd_histograma

        // console.log('Cruzamento de SMA')
        // let cruzamento_sma = await module.exports.priceCrossSMA(14, 'binance', crypto, tempo, true)
        // let cruzou_sma = cruzamento_sma.cross
        // let cruzou_sma_direcao = cruzamento_sma.direction
        // if (cruzou_sma == true) {
        //     if (cruzou_sma_direcao == 'up') {
        //         console.log('Sim, pra cima')

        //         mensagem = mensagem+'\nCruzamento de SMA para cima'
        //     } else {
        //         console.log('Sim, pra baixo')

        //         mensagem = mensagem+'\nCruzamento de SMA para baixo'
        //     }
        // } else {
        //     console.log('Não')
        // }

        // console.log('Cruzamento de EMA')
        // let cruzamento_ema = await module.exports.priceCrossEMA(14, 'binance', crypto, tempo, true)
        // let cruzou_ema = cruzamento_ema.cross
        // let cruzou_ema_direcao = cruzamento_ema.direction
        // if (cruzou_ema == true) {
        //     if (cruzou_ema_direcao == 'up') {
        //         console.log('Sim, pra cima')

        //         mensagem = mensagem+'\nCruzamento de EMA para cima'
        //     } else {
        //         console.log('Sim, pra baixo')

        //         mensagem = mensagem+'\nCruzamento de EMA para cima'
        //     }
        // } else {
        //     console.log('Não')
        // }

        // console.log('Cruzamento de MA')
        // let cruzamento_ma = await module.exports.maCross(50, 200, 'binance', crypto, tempo, true)
        // let golden_cross = cruzamento_ma.goldenCross
        // let death_cross = cruzamento_ma.deathCross
        // if (golden_cross == true) {
        //     console.log('Golden Cross, tendencia de alta')

        //     mensagem = mensagem+'\nGolden Cross existente'
        // } else {
        //     console.log('Golden Cross inexistente')
        // }

        // if (death_cross == true) {
        //     console.log('Death Cross, tendencia de baixa')

        //     mensagem = mensagem+'\nDeath Cross, tendencia de alta'
        // } else {
        //     console.log('Death Cross inexistente')
        // }

        // console.log('Breakout BB - Rompimento de canal pra uma nova tendência')
        // let breakout = await module.exports.bbCheck(50, 2, 'binance', crypto, tempo, true)
        // let rompimento_canal = breakout.breakOut
        // let rompimento_canal_direcao = breakout.direction
        // let valor = breakout.price
        // if (rompimento_canal == true) {
        //     if (rompimento_canal_direcao == 'up') {
        //         console.log('Rompimento de canal para cima')

        //         mensagem = mensagem+'\nRompimento de canal para cima'
        //     } else {
        //         console.log('Rompimento de canal para baixo')

        //         mensagem = mensagem+'\nRompimento de canal para baixo'
        //     }

        // } else {
        //     console.log('Sem rompimento de canal')
        // }




        //mensagem = mensagem+'\nValor: $'+valor




        //nao precisa usar 

        // console.log('Bollinger bands')
        // let bbData = await module.exports.bb(50, 2, 'close', 'binance', crypto, tempo, true)
        // console.log(bbData[bbData.length - 2])

        // console.log('SMA 8 on Binance BTC/USDT 15m MEDIA MOVEL')
        // let smaData = await module.exports.sma(8, 'close', 'binance', crypto, tempo, true)
        // console.log(smaData[smaData.length - 1])



        bot.telegram.sendMessage(-1001526822620, mensagem)

    } catch (err) {
        console.log(err)
    }
}

//const cryptos = ['1000SHIB', '1000XEC', '1INCH', 'AAVE', 'ADA', 'AKRO', 'ALGO', 'ALICE', 'ALPHA', 'ANC', 'ANKR', 'ANT', 'APE', 'API3', 'ARPA', 'AR', 'ATA', 'ATOM', 'AUDIO', 'AVAX', 'AXS', 'BAKE', 'BAL', 'BAND', 'BAT', 'BCH', 'BEL', 'BLZ', 'BNB', 'BNX', 'BTC', 'BTCDOM', 'BTS', 'C98', 'CELO', 'CELR', 'CHR', 'CHZ', 'COMP', 'COTI', 'CRV', 'CTK', 'CTSI', 'CVC', 'DASH', 'DEFI', 'DENT', 'DGB', 'DODO', 'DOGE', 'DOT', 'DUSK', 'DYDX', 'EGLD', 'ENJ', 'ENS', 'EOS', 'ETC', 'ETH', 'FIL', 'FLM', 'FLOW', 'FTM', 'FTT', 'GALA', 'GMT', 'GRT', 'GTC', 'HBAR', 'HNT', 'HOT', 'ICP', 'ICX', 'IMX', 'IOST', 'IOTA', 'IOTX', 'JASMY', 'KAVA', 'KLAY', 'KNC', 'KSM', 'LINA', 'LINK', 'LIT', 'LPT', 'LRC', 'LTC', 'LUNA', 'MANA', 'MASK', 'MATIC', 'MKR', 'MTL', 'NEAR', 'NEO', 'NKN', 'OCEAN', 'OGN', 'OMG', 'ONE', 'ONT', 'PEOPLE', 'QTUM', 'RAY', 'REEF', 'REN', 'RLC', 'ROSE', 'RSR', 'RUNE', 'RVN', 'SAND', 'SC', 'SFP', 'SKL', 'SNX', 'SOL', 'SRM', 'STMX', 'STORJ', 'SUSHI', 'SXP', 'THETA', 'TLM', 'TOMO', 'TRB', 'TRX', 'UNFI', 'UNI', 'VET', 'WAVES', 'WOO', 'XEM', 'XLM', 'XMR', 'XRP', 'XTZ', 'YFI', 'ZEC', 'ZEN', 'ZIL', 'ZRX'];

//da certo
//const cryptos = ['1INCH', 'AAVE', 'ADA', 'AKRO', 'ALGO', 'ALICE', 'ALPHA', 'ANC', 'ANKR', 'ANT', 'APE', 'API3', 'ARPA', 'AR', 'ATA', 'ATOM', 'AUDIO', 'AVAX', 'AXS', 'BAKE', 'BAL', 'BAND', 'BAT', 'BCH', 'BEL', 'BLZ', 'BNB', 'BNX', 'BTC', 'BTS', 'C98', 'CELO', 'CELR', 'CHR', 'CHZ', 'COMP', 'COTI', 'CRV', 'CTK', 'CTSI', 'CVC', 'DASH', 'DENT', 'DGB', 'DODO', 'DOGE', 'DOT', 'DUSK', 'DYDX', 'EGLD', 'ENJ', 'ENS', 'EOS', 'ETC', 'ETH', 'FIL', 'FLM', 'FLOW', 'FTM', 'FTT', 'GALA', 'GMT', 'GRT', 'GTC', 'HBAR', 'HNT', 'HOT', 'ICP', 'ICX', 'IMX', 'IOST', 'IOTA', 'IOTX', 'JASMY', 'KAVA', 'KLAY', 'KNC', 'KSM', 'LINA', 'LINK', 'LIT', 'LPT', 'LRC', 'LTC', 'LUNA', 'MANA', 'MASK', 'MATIC', 'MKR', 'MTL', 'NEAR', 'NEO', 'NKN', 'OCEAN', 'OGN', 'OMG', 'ONE', 'ONT', 'PEOPLE', 'QTUM', 'RAY', 'REEF', 'REN', 'RLC', 'ROSE', 'RSR', 'RUNE', 'RVN', 'SAND', 'SC', 'SFP', 'SKL', 'SNX', 'SOL', 'SRM', 'STMX', 'STORJ', 'SUSHI', 'SXP', 'THETA', 'TLM', 'TOMO', 'TRB', 'TRX', 'UNFI', 'UNI', 'VET', 'WAVES', 'WOO', 'XEM', 'XLM', 'XMR', 'XRP', 'XTZ', 'YFI', 'ZEC', 'ZEN', 'ZIL', 'ZRX'];

const cryptos_1 = ['1INCH', 'AAVE', 'ADA', 'AKRO', 'ALGO', 'ALICE', 'ALPHA', 'ANC', 'ANKR', 'ANT', 'APE', 'API3', 'ARPA', 'AR', 'ATA', 'ATOM', 'AUDIO', 'AVAX', 'AXS', 'BAKE', 'BAL', 'BAND', 'BAT', 'BCH', 'BEL', 'BLZ', 'BNB', 'BNX', 'BTC', 'BTS', 'C98', 'CELO', 'CELR', 'CHR', 'CHZ', 'COMP'];
const cryptos_2 = ['COTI', 'CRV', 'CTK', 'CTSI', 'CVC', 'DASH', 'DENT', 'DGB', 'DODO', 'DOGE', 'DOT', 'DUSK', 'DYDX', 'EGLD', 'ENJ', 'ENS', 'EOS', 'ETC', 'ETH', 'FIL', 'FLM', 'FLOW', 'FTM', 'FTT', 'GALA', 'GMT', 'GRT', 'GTC', 'HBAR', 'HNT', 'HOT', 'ICP', 'ICX', 'IMX', 'IOST', 'IOTA', 'IOTX'];
const cryptos_3 = ['JASMY', 'KAVA', 'KLAY', 'KNC', 'KSM', 'LINA', 'LINK', 'LIT', 'LPT', 'LRC', 'LTC', 'LUNA', 'MANA', 'MASK', 'MATIC', 'MKR', 'MTL', 'NEAR', 'NEO', 'NKN', 'OCEAN', 'OGN', 'OMG', 'ONE', 'ONT', 'PEOPLE', 'QTUM', 'RAY', 'REEF', 'REN', 'RLC', 'ROSE'];
const cryptos_4 = ['RSR', 'RUNE', 'RVN', 'SAND', 'SC', 'SFP', 'SKL', 'SNX', 'SOL', 'SRM', 'STMX', 'STORJ', 'SUSHI', 'SXP', 'THETA', 'TLM', 'TOMO', 'TRB', 'TRX', 'UNFI', 'UNI', 'VET', 'WAVES', 'WOO', 'XEM', 'XLM', 'XMR', 'XRP', 'XTZ', 'YFI', 'ZEC', 'ZEN', 'ZIL', 'ZRX'];

// const cryptos_1 = ['DUSK', 'FTT'];
// const cryptos_2 = ['BCH', 'ZIL'];

//nao dao certo
//1000SHIB, 1000XEC, BTCDOM, DEFI

const func_info = async (cryptos, tempo) => {
    let mensagem = 'Lista de 15 minutos\n\n'
    var contador_cryptos = 0
    for (i = 0; i < cryptos.length; i++) {
        var crypto = cryptos[i] + '/USDT'
        var rsi = await module.exports.rsiCheck(6, 75, 25, 'binance', crypto, tempo, true)
        rsi = rsi.rsiVal
        var mfi = await module.exports.mfi(6, 'binance', crypto, tempo, true)
        mfi = mfi[mfi.length - 1]
        if (((rsi > 70) || (rsi < 30)) || ((mfi > 80) || (mfi < 20))) {
            mensagem = '\n' + mensagem + crypto
            mensagem = mensagem + '\nRSI: ' + rsi
            if ((rsi > 70) || (rsi < 30)) {
                if (rsi > 70) {
                    mensagem = mensagem + ' Sobrecomprado'
                }
                if (rsi < 30) {
                    mensagem = mensagem + ' Sobrevendido'
                }
            }
            mensagem = mensagem + '\nMFI: ' + mfi
            if ((mfi > 80) || (mfi < 20)) {
                if (mfi > 80) {
                    mensagem = mensagem + ' Sobrecomprado'
                }
                if (mfi < 20) {
                    mensagem = mensagem + ' Sobrevendido'
                }
            }
            
            let breakout = await module.exports.bbCheck(50, 2, 'binance', crypto, tempo, true)
            let rompimento_canal = breakout.breakOut
            let rompimento_canal_direcao = breakout.direction
            let valor = breakout.price
            if (rompimento_canal == true) {
                if (rompimento_canal_direcao == 'up') {
                    mensagem = mensagem + '\nRompimento de canal para cima'
                } else {
                    mensagem = mensagem + '\nRompimento de canal para baixo'
                }
            }

            mensagem = mensagem + '\n\n'
            contador_cryptos++
        }
    }
    //mensagem = mensagem+'Faça sua própria análise!'
    if (contador_cryptos > 0)
        bot.telegram.sendMessage(-1001526822620, mensagem)
}

// func_info(cryptos_1, '15m')
// func_info(cryptos_2, '15m')
// func_info(cryptos_3, '15m')
// func_info(cryptos_4, '15m')

var CronJob = require('cron').CronJob;

var job_15_min = new CronJob('0 */15 * * * *', function() {
    console.log('Rodou cron de 15 min');
    func_info(cryptos_1, '15m')
    func_info(cryptos_2, '15m')
    func_info(cryptos_3, '15m')
    func_info(cryptos_4, '15m')
}, null, true, 'America/Los_Angeles');
job_15_min.start();

var job_1_hora = new CronJob('0 0 * * * *', function() {
    console.log('Rodou cron de 1 hora');
    func_info(cryptos_1, '1h')
    func_info(cryptos_2, '1h')
    func_info(cryptos_3, '1h')
    func_info(cryptos_4, '1h')
}, null, true, 'America/Los_Angeles');
job_1_hora.start();

var job_1_dia = new CronJob('0 0 0 * * *', function() {
    console.log('Rodou cron de 1 dia');
    func_info(cryptos_1, '1d')
    func_info(cryptos_2, '1d')
    func_info(cryptos_3, '1d')
    func_info(cryptos_4, '1d')
}, null, true, 'America/Los_Angeles');
job_1_dia.start();