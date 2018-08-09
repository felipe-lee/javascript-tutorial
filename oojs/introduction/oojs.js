// Person type
function Person(first, last, age, gender, pronoun, interests) {
    this.name = {
        'first': first,
        'last': last,
    };

    this.age = age;
    this.gender = gender;
    this.pronoun = pronoun;
    this.interests = interests;
}

/* method: Person::greeting()
 * alerts user with greeting from person.
*/
Person.prototype.greeting = function () {
    alert('Hi! I\'m ' + this.name.first + ' ' + this.name.last + '.');
};

/* method: Person::bio()
 * alert user about person's bio.
*/
Person.prototype.bio = function () {
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

    let bioStatement = this.name.first + ' ' + this.name.last + ' is ' + this.age + ' years old. ' +
        this.pronoun.charAt(0).toUpperCase() + this.pronoun.slice(1) + ' ' + interestsStatement;

    alert(bioStatement);
};

/* method: Person::farewell()
 * alerts user that person has left.
 */
Person.prototype.farewell = function () {
    alert(this.name.first + ' has left the building. Bye for now!');
};

// Teacher type
function Teacher(first, last, age, gender, pronoun, interests, subject) {
    Person.call(this, first, last, age, gender, pronoun, interests);

    this.subject = subject;
}

Teacher.prototype = Object.create(Person.prototype);
Teacher.prototype.constructor = Teacher;

/* method: Teacher::greeting()
 * greets user with a teacher appropriate greeting.
 */
Teacher.prototype.greeting = function () {
    let prefix = '';

    if (this.gender.toLowerCase() === 'male') {
        prefix = 'Mr.';
    } else if (this.gender.toLowerCase() === 'female') {
        prefix = 'Ms.';
    } else {
        prefix = 'Mx.';
    }

    alert('Hello, my name is ' + prefix + ' ' + this.name.last + ', and I teach ' + this.subject + '.');
};
