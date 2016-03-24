console.log('test');

describe('View manipulations', function(){
    it('Checks elements hiding and showing', function(){
        
        var element = document.createElement('div');
        element.setAttribute('id', 'mainMenu');
        document.body.appendChild(element);
        
        
        hideElement('mainMenu');
        assert.equal(element.hasAttribute('hidden'), true);
        showElement('mainMenu');
        assert.equal(element.hasAttribute('hidden'), false);

    });
    
    it('Checks that container cleared', function(){
        
        var elementContainer = document.createElement('div');
        elementContainer.setAttribute('class', 'container');
        document.body.appendChild(elementContainer);
        
        for(var i = 0; i < 10; i++){
            var element = document.createElement('div');
            elementContainer.appendChild(element);
        }
        
        

        assert.equal(elementContainer.hasChildNodes(), true);
        resetContainer();
        assert.equal(elementContainer.hasChildNodes(), false);

    });
});