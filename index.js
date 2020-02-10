const term = require( 'terminal-kit' ).terminal ;

let progressBar , progress = 0 ;
let summ = Math.floor(Math.random() * 21);
const items = [
    'Взять еще карту' ,
    'Хватит' ,
];

const doProgress = () => {
    progress += Math.random() / 10 ;
    progressBar.update(progress) ;
    if (progress >= 1) {
        setTimeout(() => {term( '\n' ); next();},200);
    } else {
        setTimeout(doProgress , 100 + Math.random() * 100);
    }
};

const doProgressAgain = () => {
    progress += Math.random() / 10 ;
    progressBar.update(progress) ;
    if (progress >= 1) {
        setTimeout(() => {term( '\n' ); playComputer();},200);
    } else {
        setTimeout(doProgressAgain , 100 + Math.random() * 100);
    }
};

const next = () => {
    term.cyan( `Сумма твоих карт ${summ}.\n` );
    term.singleColumnMenu( items , function( error , response ) {
        if (response.selectedIndex === 0) {
            summ += Math.floor(Math.random() * 11);
            if (summ > 21) {
                exit();
            } else if(summ === 21) {
                term.green('BLACKJACK\n');
                stop();
            } else {
                next();
            }
        } else {
            stop();
        }
    });
};

const exit = () => {
    term.red( `Сумма твоих карт ${summ}, ты проиграл\n` );
    summ = Math.floor(Math.random() * 21);
    progress = 0;
    entryQuestion('Сыграем еще? [Y|n]\n' );
};

const stop = () => {
    progress = 0;
    progressBar = term.progressBar({
        width: 50 ,
        title: 'Сдаю карты себе:' ,
        percent: true
    });
    doProgressAgain();
};

const playComputer = () => {
    const computerSumm = Math.floor(Math.random()*40);
    if (computerSumm <= 21 && computerSumm > summ) {
        term.red(`У меня ${computerSumm}, я победил\n`);
    } else if (computerSumm <= 21 && computerSumm < summ) {
        term.green(`У меня ${computerSumm}, ты победил!\n`);
    } else {
        term.green('У меня перебор, ты победил!\n');
    }
    summ = Math.floor(Math.random() * 21);
    progress = 0;
    entryQuestion('Сыграем еще? [Y|n]\n' );
};

const entryQuestion = (text) => {
    term(text);
    term.yesOrNo({yes:['y','ENTER'], no:['n']} , (error, result) => {
        if (result) {
            progressBar = term.progressBar({
                width: 50 ,
                title: 'Сдаю карты:' ,
                percent: true
            });
            doProgress();
        }
        else {
            term.red("Ой, всё!\n");
            process.exit();
        }
    });
};

entryQuestion('Поиграем BlackJack? [Y|n]\n');