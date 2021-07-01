//Validaton 
// a "?" makes the property optional
interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}



//Autobind decorator
function autobind(
    _: any, 
    _2: string, 
    descriptor: PropertyDescriptor
    ) {
       const originalMethod = descriptor.value;
       const adjDescriptor: PropertyDescriptor = {
           configurable: true,
           get() {
               const boundFn = originalMethod.bind(this);
               return boundFn
           }
       };
       return adjDescriptor
    }

//Project Input Class
class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor(){
        // Exclamation point means it will not be null
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement

        const importedNode = document.importNode(
            this.templateElement.content, 
            true
            );
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = 'user-input';

        this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement;
        this.descriptionElement = this.element.querySelector('#description')! as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people')! as HTMLInputElement;

        this.configure();
        this.attach();
    }

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDesciption = this.descriptionElement.value;
        const enteredPeople = this.peopleInputElement.value;

        // if (enteredTitle.trim().length === 0 ||
        //     enteredDesciption.trim().length === 0 ||
        //     enteredPeople.trim().length === 0
        // )
        if {
            validate({value: enteredTitle, required: true, minLength: 5}) &&
            validate({value: enteredDesciption, required: true, minLength: 5}) &&
            validate({value: enteredPeople, required: true, minLength: 5})
        } { 
            alert('invalid input');
            return
        } else {
            return [enteredTitle, enteredDesciption, +enteredPeople]
        }
    }

    private clearInputs() {
        this.titleInputElement.value = '',
        this.descriptionElement.value = '',
        this.peopleInputElement.value = ''
    }

    @autobind
    private submitHandler(event: Event){
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            console.log(title, description, people)
            this.clearInputs()
        }
    }

    private configure(){
        this.element.addEventListener('submit', this.submitHandler)
    }

    private attach (){
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}

const prjInput = new ProjectInput