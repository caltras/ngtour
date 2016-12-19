# **NGTour**
  
Componente angular para criação de tour virtual em um página ou aplicação web.
O uso desse componente é simples.

## Instalação

`npm install ngtour`

## Uso
Adicione as bibliotecas 

Lodash.js

Jump.js (opcional para efeito smooth do scroll)

DoublyLinkedList (Localizado nas pasta de código fonte "/src/js/doubly-linked-list.js")

NgTour (Localizado nas pasta de código fonte "/src/js/ngtour.js" e "/src/css/ngtour.js")

Crie sua aplicação angular (versão maior que 1.5) e adicione o módulo ngTour

`
    angular.module("ngTourExample",["ngTour"])
`

Adicione o componente, definindo um id e o estilo padrão

`
    <ng-tour id="tour-1" style="{width:'100px',height:'200px'}"></ng-tour>
`

Mapeie seus elementos de tela para que o NgTour possa reconhecê-los e criar o tour virtual.

Ex.:

`
    <input type="text" tour data-step="1" data-description="This is a input element">
`

**Atenção:** Elementos com visibilidade do tipo hidden ou display do tipo none não serão apresentados no tour.

Depois de definido os componentes a fazerem parte do tour virtual, pode-se inicializar o tour chamando a função start do ngTour.

Para isso é necessário injetar o serviço *ngTourComponentService* como no exemplo

```
angular.module("ngTourExample",["ngTour"])
    .controller("exampleCtrl",function(ngTourComponentService,$timeout){
        var pub = this;
        pub.tutor ={
            form: "Form data",
            button : {
                start : "Start the interactive tutorial.",
                submit: "Submit form"
            },
            input : {
                user: "User field",
                name: "Name Field",
                phone: "Phone Field"
            },
            video : "This is a Video tag",
            invisible : "This is a invisible component.",
            textarea: "TextArea"
        };
        pub.startTutorial = function(){
            var tour = ngTourComponentService.get("tour-1");
            if(tour){
                tour.start();
            }
        };
        
});
```
License **MIT**

###### Developed by *Claudio Traspadini Oliveira*
