class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement
    element: HTMLFormElement

    constructor(){
        // Exclamation point means it will not be null
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.attach();
    }
    
    private attach (){
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}

const prjInput = new ProjectInput