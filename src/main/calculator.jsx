import React, { Component } from 'react'
import './calculator.css'
import '../components/Button'
import Button from '../components/Button'
import Display from '../components/Display'

    /*Criando o estado inícial de um objeto*/
    const initialState = {
        displayValue: '0', // valor inicial do display
        clearDisplay: false,  //limpar o display quando solicitado pelo usuário
        operation: null,   //armazenar a operação solicitada pelo usuário
        values: [0,0],   //armazenar os dois numeros que serão operados
        current: 0     //para manipular o indice do array acima
    }


export default class calculator extends Component {
    //criando um clone do objeto initialState para facilitar;
    state = { ...initialState}


    /*O CONSTRUTOR FOI CRIADO PARA UTILIZAR O BIND NOS MÉTODOS DA CLASSE
    E PROTEGER O THIS PARA NÃO VARIAR. POIS O THIS SERÁ USADO NA PARTE JSX DESTE MESMO CÓDIGO*/
    constructor(props){
        super(props)
        this.clearMemory = this.clearMemory.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.addDigit = this.addDigit.bind(this);
    }

    clearMemory() {
       this.setState({ ...initialState});  //quando o botão AC for clicado voltar ao estado padrão da calculadora
    }

    setOperation(operation) {
        if (this.state.current === 0){
            this.setState({operation, current: 1, clearDisplay: true })
        }else{
            const equals = operation === '=';
            const currentOperation = this.state.operation;

            const values = [...this.state.values];
            try {
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
                if (isNaN(values[0]) || !isFinite(values[0])) {
                    this.clearMemory()
                return
                }
            }catch(e) {
                values[0] = this.state.values[0];
            }
            
            values[1] = 0;
            
            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    addDigit(n) {
        if(n === '.' && this.state.displayValue.includes('.')){
            return
        }

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay;
        const currentValue = clearDisplay ? '' : this.state.displayValue;
        const displayValue = currentValue + n;
        this.setState({ displayValue, clearDisplay: false})

        if (n !== '.'){
            const i = this.state.current;
            const newValue = parseFloat(displayValue);
            const values = [...this.state.values]
            values[i] = newValue;
            this.setState( {values} )
            console.log(values)
        }
    }

    


    render(){
            /*Estou usando as propriedades css criadas. Não é preciso inserí-la em className*/
        return(
            <div className='calculator'>
                <Display value={this.state.displayValue}/>
                <Button label='AC' click={this.clearMemory} triple /> 
                <Button label='/' click={this.setOperation} operation/>
                <Button label='7' click={this.addDigit}/>
                <Button label='8' click={this.addDigit}/>
                <Button label='9' click={this.addDigit}/>
                <Button label='*' click={this.setOperation} operation/>
                <Button label='4' click={this.addDigit}/>
                <Button label='5' click={this.addDigit}/>
                <Button label='6' click={this.addDigit}/>
                <Button label='-' click={this.setOperation} operation/>
                <Button label='1' click={this.addDigit}/>
                <Button label='2' click={this.addDigit}/>
                <Button label='3' click={this.addDigit}/>
                <Button label='+' click={this.setOperation} operation/>
                <Button label='0' click={this.addDigit} double/>
                <Button label='.' click={this.addDigit}/>
                <Button label='=' click={this.setOperation} operation/>
                 
            </div>
        )
    }
}
