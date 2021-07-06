/// <reference path="base-component.ts" />

namespace App {
    //Project Input Class
    export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
        titleInputElement: HTMLInputElement;
        descriptionElement: HTMLInputElement;
        peopleInputElement: HTMLInputElement;

        constructor(){
            super('project-input', 'app', true,'user-input');
            // Exclamation point means it will not be null
            this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement;
            this.descriptionElement = this.element.querySelector('#description')! as HTMLInputElement;
            this.peopleInputElement = this.element.querySelector('#people')! as HTMLInputElement;
            
            this.configure();
        }

        configure(){
            this.element.addEventListener('submit', this.submitHandler);
            
        }

        renderContent() {};

        private gatherUserInput(): [string, string, number] | void {
            const enteredTitle = this.titleInputElement.value;
            const enteredDesciption = this.descriptionElement.value;
            const enteredPeople = this.peopleInputElement.value;

            const titleValidatable: Validatable = {
                value: enteredTitle,
                required: true
            };
            const descriptionValidatable: Validatable = {
                value: enteredDesciption,
                required: true,
                minLength: 5
            };
            const peopleValidatable: Validatable = {
                value: +enteredPeople,
                required: true,
                min: 1,
                max: 5
            };

            if (
                !validate(titleValidatable) ||
                !validate(descriptionValidatable) ||
                !validate(peopleValidatable)
            ) { 
                alert('invalid input');
                return;
            } else {
                return [enteredTitle, enteredDesciption, +enteredPeople]
            }
        }

        private clearInputs() {
            this.titleInputElement.value = '';
            this.descriptionElement.value = '';
            this.peopleInputElement.value = '';
        }

        @autobind
        private submitHandler(event: Event){
            event.preventDefault();
            const userInput = this.gatherUserInput();
            if (Array.isArray(userInput)) {
                const [title, description, people] = userInput;
                projectState.addProject(title, description,people);
                this.clearInputs();
            }
        }
    }
}