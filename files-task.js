const fs = require('fs');
const csv = require('csvtojson');

if (process.argv[2] === '--streams') {
    const readableStream = fs.createReadStream('./csv/books.csv');
    const writableStream = fs.createWriteStream('./txt/books.txt');

    readableStream.pipe(csv())
        .pipe(writableStream)
        .on('error', () => console.error(error.message));
} else {
    const fsPromises = fs.promises;

    csv().fromFile('./csv/books.csv')
        .then(jsonObj => {
            const convertedData = jsonObj.map(obj => ({
                book: obj.Book,
                author: obj.Author,
                price: obj.Price
            }));

            let fileContent = '';
            for (let line of convertedData) {
                fileContent += JSON.stringify(line) + '\n';
            }

            fsPromises.writeFile('./txt/books.txt', fileContent).catch(err => err.message);
        }).catch(err => err.message);
}
