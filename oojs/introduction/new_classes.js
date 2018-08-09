class Person {
    constructor(first, last, age, gender, pronoun, interests) {
        this.name = {
            'first': first,
            'last': last,
        };

        this.age = age;
        this.gender = gender;
        this.pronoun = pronoun;
        this.interests = interests;
    }

    greeting() {
        console.log(`Hi! I'm ${this.name.first} ${this.name.last}.`);
    };

    bio() {
        let interestsStatement = 'likes ';
        for (let i = 0; this.interests.length > i; i++) {
            if (this.interests.length - 1 === i) {
                interestsStatement += this.interests[i] + '.';
            } else if (this.interests.length - 2 === i) {
                if (this.interests.length > 2) {
                    interestsStatement += this.interests[i] + ', and ';
                } else {
                    interestsStatement += this.interests[i] + ' and ';
                }
            } else {
                interestsStatement += this.interests[i] + ', ';
            }
        }

        if (this.interests.length === 0) {
            interestsStatement = 'doesn\'t like anything!';
        }

        if (this.pronoun.toLowerCase() === 'they') {
            interestsStatement = interestsStatement.replace(/likes/, 'like').replace(/doesn't/, 'don\'t');
            console.log(this.name.first + '\'s pronoun is ' + this.pronoun)
        }

        let bioStatement = `${this.name.first} ${this.name.last} is ${this.age} years old. 
        ${this.pronoun.charAt(0).toUpperCase()}${this.pronoun.slice(1)} ${interestsStatement}`;

        console.log(bioStatement);
    };

    farewell() {
        console.log(`${this.name.first} has left the building. Bye for now!`);
    }
}

class Teacher extends Person {
    constructor(first, last, age, gender, pronoun, interests, subject) {
        super(first, last, age, gender, pronoun, interests);

        this._subject = subject;
    }

    get subject() {
        return this._subject;
    }

    set subject(newSubject) {
        this._subject = newSubject;
    }

    greeting() {
        let prefix = '';

        if (this.gender.toLowerCase() === 'male') {
            prefix = 'Mr.';
        } else if (this.gender.toLowerCase() === 'female') {
            prefix = 'Ms.';
        } else {
            prefix = 'Mx.';
        }

        console.log(`Hello, my name is ${prefix} ${this.name.last}, and I teach ${this.subject}.`);
    }
}

class Student extends Person {
    constructor(first, last, age, gender, pronoun, interests, year) {
        super(first, last, age, gender, pronoun, interests);

        this.year = year;
    }

    greeting() {
        let yearString = '';

        switch (this.year) {
            case 1:
                yearString = 'freshman';
                break;
            case 2:
                yearString = 'sophomore';
                break;
            case 3:
                yearString = 'junior';
                break;
            default:
                yearString = 'senior';
        }

        console.log(`Hey, I'm ${this.name.first}. I'm a ${yearString}.`);
    }
}