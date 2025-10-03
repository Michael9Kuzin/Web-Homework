
function guess_the_number() {
    
    const guess_num = Math.floor(Math.random() * 100) + 1;
    let enter_num;

    console.log("Guess: " + guess_num);

    do {
        enter_num = Number(prompt("Enter number (1 - 100):"));

        if (enter_num > guess_num) {
            console.log(`The guess number is smoller then ${enter_num}`);

        } else if (enter_num < guess_num) {
            console.log(`The guess number is bigger then ${enter_num}`);

        } else {
            console.log(`YOU ARE WIN! The guess number is ${enter_num}`);
        }
    
    } while (enter_num !== guess_num);
}

guess_the_number()
