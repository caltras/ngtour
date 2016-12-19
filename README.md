#NGTour  
  
Componente angular para criação de tour virtual em um página ou aplicação web.
O uso desse componente é simples.

#Instalação

`npm install ngtour`

#Uso
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

Elementos com visibilidade do tipo hidden ou display do tipo none não serão apresentados no tour.