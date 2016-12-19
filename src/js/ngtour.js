;(function(ng,_,J){
    "use strict"
    const ORIENTATION = {
        LEFT: "left",
        RIGHT:"right",
        TOP:"top",
        BOTTOM:"bottom"
    };
    var ngtour = ng.module("ngTour",[]);
    var template = `
        <div class="ng-tour" ng-show="$ctrl.visible" ng-click="$ctrl.close($event)">
            <div class='control'>
                <button class='btn btn-close' title="Close" ng-click="$ctrl.close($event)">
                    <div class='inner'>X</div>
                </button>
            </div>
            <div class="hole" ng-style="$ctrl.style"></div>
            <div ng-if="$ctrl.step" class="ng-tour-box fixed-bottom" >
                <div class="ng-tour-box-inner">
                    <div class='ng-tour-description' ng-bind='$ctrl.step.data.description'></div>
                    <div class="ng-tour-group-button">
                        <button class='btn btn-prev' ng-disabled="$ctrl.isFirst" title="Previous" ng-click="$ctrl.prev()">
                            <div class='inner'>&#8672;</div>
                        </button>
                        <button class='btn btn-next' ng-disabled="$ctrl.isLast" title="Next" ng-click="$ctrl.next()">
                            <div class='inner'>&#8674;</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    var NgTourController = function($scope,ngTourService,ngTourComponentService,$timeout){
        var pub = this;
        pub.visible=false;
        var priv = {};
        priv.lastStep=null;
        pub.s = 0;
        pub.step = null;
        pub.styleDescription = {};
        pub.isFirt = false;
        pub.isLast = false;
        priv.setParameters = function(top,left,width,height,orientation){
            pub.style.top = top+"px";
            pub.style.left = left+"px";
            pub.style.width= width+"px";
            pub.style.height= height+"px";
            pub.styleDescription.top = pub.style.top;
            switch (orientation) {
                case ORIENTATION.RIGHT:
                    pub.styleDescription.left = (left+width)+"px";
                    break;
                case ORIENTATION.LEFT:
                    pub.styleDescription.left = (left-width)+"px";
                    break;
                case ORIENTATION.TOP:
                    pub.styleDescription.top = (top-height)+"px";
                    break;
                case ORIENTATION.BOTTOM:
                    pub.styleDescription.top = (top+height)+"px";
                    break;
                default:
            }
            pub.styleDescription.minHeight = pub.style.height;
        };
        priv.setFlags = function(){
            pub.isFirst = true;
            pub.isLast = true;
            if(pub.step){
                pub.isFirst = pub.step.isFirst();
                pub.isLast = pub.step.isLast();
            }
        };
        priv.setData = function(data){
            var width = data.target[0].offsetWidth;
            var height = data.target[0].offsetHeight;
            var position = {top: data.target[0].offsetTop,left:data.target[0].offsetLeft};
            priv.setParameters(position.top,position.left,width,height,data.orientation);
            priv.scrollToElement(data.target[0]);
        };
        priv.scrollToElement = function(target){
            if(J){
                new J(target, {
                  duration: 500,
                });
            }else{
                target.scrollIntoView( {behavior:'smooth'});
            }
        };
        pub.$onInit = function(){
        
        };
        
        pub.next = function(){
            if(pub.step.next){
                pub.step = pub.step.next;
                if(!ngTourService.isVisibleComponent(pub.step.data)){
                    pub.next();
                }else{
                    priv.lastStep=pub.step;
                    priv.setData(pub.step.data);
                }
            }else{
                pub.step = priv.lastStep;
            }
            priv.setFlags();
        };
        pub.prev = function(){
            if(pub.step.previous){
                pub.step = pub.step.previous;
                if(!ngTourService.isVisibleComponent(pub.step.data)){
                    pub.prev();
                }else{
                    priv.lastStep=pub.step;
                    priv.setData(pub.step.data);
                }
            }else{
                pub.step = priv.lastStep;
            }
            priv.setFlags();
        };
        pub.start = function(){
            ngTourService.createDoublyList();
            pub.visible=true;
            priv.setParameters(0,0,0,0);
            $timeout(function(){
                pub.step = ngTourService.steps.searchNodeAt(1);
                priv.setFlags();
                priv.setData(pub.step.data);
            },50);
        };
        pub.close = function(ev){
            if(ng.element(ev.target).hasClass("ng-tour") || ng.element(ev.target).hasClass("btn-close") || ng.element(ev.target).parent().hasClass("btn-close")){
                pub.s = 0;
                pub.visible=false;
                priv.setParameters(0,0,0,0);
                pub.step = null;
                priv.setFlags();
            }
        };
        $scope.$on("destroy",function(){
            ngTourComponentService.remove(pub.id);
        });
        ngTourComponentService.add(pub);
    };
    NgTourController.$inject = ["$scope","ngTourService","ngTourComponentService","$timeout"];
    ngtour.component("ngTour",{
        bindings:{
            style:"=",
            id:"@"
        },
        template:template,
        controller : NgTourController
    });
    
    ngtour.directive("tour",["ngTourService",function(ngTourService){
        var directive = {};
        directive.link = function(scope,element,attrs){
            var step = Number(attrs.step);
            var description = attrs.description;
            var pos = attrs.position || "left";
            if(description){
                ngTourService.add(element,step,description,pos);
            }
        };
        return directive; 
    }]);
    ngtour.service("ngTourService",function(){
        var service = {
            list : [],
            steps : new DoublyList(),
            add : function(el,step,description,pos){
                var width = el[0].offsetWidth;
                var height = el[0].offsetHeight;
                var position = {top: el[0].offsetTop,left:el[0].offsetLeft};
                service.list.push({width:width,height:height,target:el,position:position,step:step,description:description,orientation:pos});
                service.list = _.sortBy(service.list,"step");
            },
            createDoublyList : function(){
                service.steps = new DoublyList()
                service.list = _.sortBy(service.list,"step");
                service.steps.process(service.list);
            },
            remove : function(step){
                //_.remove(service.steps,{step:step});
            },
            clean : function(){
                service.steps = new DoublyList();
                service.list = [];
            },
            isVisibleComponent:function(stepElement){
                var computedStyle= window.getComputedStyle(stepElement.target[0]);
                return computedStyle.display !=="none" && computedStyle.visibility !=="hidden";
            }
        };
        return service;
    });
    ngtour.service("ngTourComponentService",function(){
        var components = [];
        return {
            add : function(pub){
                components.push(pub);
            },
            remove : function(id){
                _.remove(components,{id:id});
            },
            get : function(id){
                return _.find(components,{id:id});
            }
        };
    });
    
})(angular,_,Jump);