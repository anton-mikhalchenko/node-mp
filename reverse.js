console.log('Enter your string: ');

process.stdin.on('data', (data) => {
    const reversedString = data.toString().split('').reverse().join('');
    process.stdout.write(reversedString + '\n');
});
