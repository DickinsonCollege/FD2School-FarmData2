import { mount } from '@cypress/vue2'
import { shallowMount } from '@vue/test-utils'

var RegexInputComp = require("./RegexInputComponent.js")
var RegexInputComponent = RegexInputComp.RegexInputComponent

describe('RegexInput Component', () => {
    context('normal feature tests', () => {
        beforeEach(() => {
            mount(RegexInputComponent, {
                propsData: {
                    regExp: '^[1-9]+[0-9]*$',
                    setColor: 'pink',
                    setHeight: '25px',
                    setWidth: '75px',
                    setMin: '0',
                    setMax: '10',
                    setStep: '1',
                }
            })
        })

        it('exists', () => {
            cy.get('[data-cy=regex-input]').should('exist')
        })
        it('can be typed in', () => {
            cy.get('[data-cy=text-input]')
                .clear()
                .type('Hello World!')
                .should('have.value', 'Hello World!')
        })
        it('make sure width exists and has a pre-set value', () => {
            cy.get('[data-cy=text-input]')
                .should('have.css', 'width', '75px')
        })
        it('make sure height exists and has a pre-set value', () => {
            cy.get('[data-cy=text-input]')
                .should('have.css','height', '25px')
        })
        it('make sure color is white and not set setColor', () => {
            cy.get('[data-cy=text-input]')
                .should('have.css','background-color', 'rgb(255, 255, 255)')
        })
        it('make sure min exists and has a pre-set value', () => {
            cy.get('[data-cy=text-input]')
                .should('have.attr','min', '0')
        })
        it('make sure max exists and has a pre-set value', () => {
            cy.get('[data-cy=text-input]')
                .should('have.attr','max', '10')
        })
        it('make sure step exists and has a pre-set value', () => {
            cy.get('[data-cy=text-input]')
                .should('have.attr','step', '1')
        })
        it('initial emit for isMatch matches the value inputted', () => {
            const spy = cy.spy()
            Cypress.vue.$on('match-changed', spy)
            cy.get('[data-cy=text-input]')
                .click()
                .blur()
                .then(() => {
                    expect(spy).to.be.called
                })
        })
        it('isMatch is not emitted after initial emit if its value is not updated', () => {
            const spy = cy.spy()
            Cypress.vue.$on('match-changed', spy)
            cy.get('[data-cy=text-input]')
                .type('Hello World')
                .blur()
                .then(() => {
                    expect(spy).to.be.called
                    cy.get('[data-cy=text-input]')
                    .clear()
                    .type('Goodbye World')
                    .blur()
                    .then(() => {
                        expect(spy).not.to.be.calledTwice
                    })
                })
        })
        it('emits the new isMatch value after blur', () => {
            const spy = cy.spy()
            Cypress.vue.$on('match-changed', spy)
            cy.get('[data-cy=text-input]')
                .type('1205')
                .blur()
                .then(() => {
                    expect(spy).to.be.called
                })
        })

        it('emit does not happen when isMatch value does not change after a valid value change', () => {
            const spy = cy.spy()
            Cypress.vue.$on('match-changed', spy)
            cy.get('[data-cy=text-input]')
                .type('1205')
                .blur()
                .then(() => {
                    expect(spy).to.be.called
                    cy.get('[data-cy=text-input]')
                    .clear()
                    .type('1207')
                    .blur()
                    .then(() => {
                        expect(spy).not.to.be.calledTwice
                    })
                })
        })


        it('emits the new value after blur', () => {
            const spy = cy.spy()
            Cypress.vue.$on('input-changed', spy)
            cy.get('[data-cy=text-input]')
                .type('1205')
                .blur()
                .then(() => {
                    expect(spy).to.be.called
            })
        })
    })

    context('testing disabled option', () => {
        it('checking if the input box is disabled', () => {
            mount(RegexInputComponent, {
                propsData: {
                    regExp: null,
                    defaultVal: null,
                    disabled: true,
                }
            })
            cy.get('[data-cy=text-input]')
            .should('be.disabled')
        })
        it('checking disabled when prop changes', () => {
            let comp;
            comp = shallowMount(RegexInputComponent, {
                propsData: {
                    regExp: null,
                    defaultVal: null,
                    disabled: true,
                },
            })
            expect(comp.vm.isDisabled).to.equal(true)
            cy.wrap(comp.setProps({ disabled: false })).then(() => {
                expect(comp.vm.isDisabled).to.equal(false)
            })
        })
    })

    context('emitted events test', () => {
        let comp;
        it('defaultVal change emits event', () => {
            const spy = cy.spy()
            comp = shallowMount(RegexInputComponent, {
                propsData: {
                    regExp: null,
                    defaultVal: null
                },
                listeners: {
                    'input-changed' : spy
                },
            })
            expect(comp.vm.defaultVal).to.equal(null)
            cy.wrap(comp.setProps({defaultVal : '1205'}))
                .then(() => {
                    expect(comp.vm.defaultVal).to.equal('1205')
                    expect(spy).to.be.calledWith('1205')
                })
        })
        it('val emits the correct value', () => {
            const spy = cy.spy()
            comp = shallowMount(RegexInputComponent, {
                propsData: {
                    regExp: '^[1-9]+[0-9]*$',
                    defaultVal: null
                },
                listeners: {
                    'input-changed' : spy
                },
            })
            expect(comp.vm.defaultVal).to.equal(null)
            expect(comp.vm.val).to.equal(null)
            cy.wrap(comp.setProps({defaultVal : 'cheese'}))
                .then(() => {
                    expect(comp.vm.defaultVal).to.equal('cheese')
                    expect(comp.vm.val).to.equal('cheese')
                    expect(spy).to.be.calledWith('cheese')
                })
        })
        it('val emits the correct value when set to null', () => {
            const spy = cy.spy()
            comp = shallowMount(RegexInputComponent, {
                propsData: {
                    regExp: '^[1-9]+[0-9]*$',
                    defaultVal: 'cheese'
                },
                listeners: {
                    'input-changed' : spy
                },
            })
            expect(comp.vm.defaultVal).to.equal('cheese')
            expect(comp.vm.val).to.equal('cheese')
            expect(comp.vm.inputStyle.backgroundColor).to.equal('white')
            cy.wrap(comp.setProps({defaultVal : null}))
                .then(() => {
                    expect(comp.vm.inputStyle.backgroundColor).to.equal('white')
                    expect(comp.vm.defaultVal).to.equal(null)
                    expect(comp.vm.val).to.equal(null)
                    expect(spy).to.be.calledWith(null)
                })
        })
        it('isMatch emits false when regex is null', () => {
            const spy = cy.spy()
            comp = shallowMount(RegexInputComponent, {
                propsData: {
                    regExp: null,
                    defaultVal: null
                },
                listeners: {
                    'match-changed' : spy
                },
            })
            cy.wrap(comp.setData({isMatch : true}))
            expect(comp.vm.isMatch).to.equal(true)
            cy.wrap(comp.setData({defaultVal : '10'}))
                .then(() => {
                    expect(comp.vm.isMatch).to.equal(false)
                    expect(spy).to.be.calledWith(false)
                })
        })
        it('isMatch emits true when regex is set and value is valid', () => {
            const spy = cy.spy()
            comp = shallowMount(RegexInputComponent, {
                propsData: {
                    regExp: '^[1-9]+[0-9]*$',
                    defaultVal: null
                },
                listeners: {
                    'match-changed' : spy
                },
            })
            expect(comp.vm.defaultVal).to.equal(null)
            expect(comp.vm.isMatch).to.equal(null)
            cy.wrap(comp.setProps({defaultVal : '1016'}))
                .then(() => {
                    expect(comp.vm.defaultVal).to.equal('1016')
                    expect(spy).to.be.calledWith(true)
                })
        })
        it('isMatch emits false when regex is set and value is invalid', () => {
            const spy = cy.spy()
            comp = shallowMount(RegexInputComponent, {
                propsData: {
                    regExp: '^[1-9]+[0-9]*$',
                    defaultVal: null
                },
                listeners: {
                    'match-changed' : spy
                },
            })
            cy.wrap(comp.setData({isMatch : true}))
            expect(comp.vm.isMatch).to.equal(true)
            expect(comp.vm.defaultVal).to.equal(null)
            cy.wrap(comp.setProps({defaultVal : 'cheese'}))
                .then(() => {
                    expect(comp.vm.defaultVal).to.equal('cheese')
                    expect(spy).to.be.calledWith(false)
                })
        })
        it('isMatch does not emit anything when isMatch has no value change', () => {
            const spy = cy.spy()
            comp = shallowMount(RegexInputComponent, {
                propsData: {
                    regExp: '^[1-9]+[0-9]*$',
                    defaultVal: null
                },
                listeners: {
                    'match-changed' : spy
                },
            })
            expect(comp.vm.isMatch).to.equal(null)
            expect(comp.vm.defaultVal).to.equal(null)
            cy.wrap(comp.setProps({defaultVal : 'cheese'}))
                .then(() => {
                    expect(comp.vm.defaultVal).to.equal('cheese')
                    expect(spy).to.be.called
                    cy.wrap(comp.setProps({defaultVal : 'lettuce'}))
                    .then(() => {
                        expect(comp.vm.defaultVal).to.equal('lettuce')
                        expect(spy).not.to.be.calledTwice
                    })
                })
        })
    })
    context('prop changes test', () => {
        let comp;
        beforeEach(() => {
            // Use shallowMount here so we can use setProp in its
            comp = shallowMount(RegexInputComponent, {
                propsData: {
                    regExp: "^[1-9]+[0-9]*$",
                    defaultVal: "",
                },
            })
        })

        it('change regExp', () => {
            expect(comp.vm.regex).to.equal('^[1-9]+[0-9]*$')
            cy.wrap(comp.setProps({ regExp: '|^[1-9]+[0-9]*$' })).then(() => {
                expect(comp.vm.regex).to.equal('|^[1-9]+[0-9]*$')
            })

        })

    })
    
})
