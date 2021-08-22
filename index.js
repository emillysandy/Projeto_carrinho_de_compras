console.log('--------------------------------------')
console.log('Bem-Vindo ao seu Carrinho de Compras  ')
console.log('--------------------------------------')

//vamos instanciar, o nosso banco de dados
const db = require('./database')
const { produtos } = db

// Listar no console uma tabela contendo os produtos em ordem crescente de preço (do menor ao maior).
//const novo = produtos.sort((a, b) => a.preco - b.preco)
console.log('Esses são os produtos disponíveis')
console.table(produtos)

//Recebendo via terminal através do readline-sync
const read = require('readline-sync')

//Criando ARRAYS para armazenar valores de id e quantidade de produtos
const total = []
const quantidade = []

//Busca por categoria.
const verProdutos = read.question('Voce deseja encontrar o produto por categoria? (S / N) :')
if (verProdutos.toUpperCase() === 'S') {
    console.log('--------------------------------------')
    console.log('Essas são as nossas categorias:')
    console.log('alimento, bebida, casa, higiene, informática')
    console.log('--------------------------------------')

    const qualCategoria = read.question('Voce esta procurando produtos de qual categoria? ')
    //Filtrando por categoria
    const categorias = produtos.filter(item => item.categoria === qualCategoria)
      console.table(categorias); 

}else{ (verProdutos.toUpperCase() !== 'S') 
    console.log('Esses são nossos produtos disponiveis!')
    console.table(produtos)
}


console.log('--------------------------------------')
//Recebendo o id do produto solicitado
const idProduto = read.question("Digite o ID do produto desejado: ")
function recebendoId(id, listaTotal, listaQuant){
    const ide = Number(id)
    const nome = produtos[ide - 1].nome
    
    
    //Recebendo  a quantidade desejada
    const quantProd = read.question("Digite a quantidade desejada desse produto: ")
    listaQuant.push(Number(quantProd))
    const preco = produtos[ide - 1].preco
    const compraTotal = Number(quantProd) * Number(preco)
    listaTotal.push(Number(compraTotal))

    console.log(`Voce adicionou ${quantProd} ${nome} ao seu carrinho`)
   

    //Perguntando se deseja adicionar mais itens ao carrinho
    const outroProduto = read.question("Deseja continuar comprando ? (S/N) ")
    if(outroProduto.toLocaleUpperCase() == "S"){
    const idNovo= read.question("Digite o ID do produto que voce deseja: ")
    
    recebendoId(idNovo, listaTotal, listaQuant)
}else{
    console.log("--------------------")
    console.log("Pedido Encerrado")
    console.log("--------------------")
}
}
recebendoId(idProduto, total, quantidade)

//Fazendo calculos gerais
let totalQuantidade = quantidade.reduce((total, currentElement) => total + currentElement)
let totalPreco = total.reduce((total, currentElement) => total + currentElement)

//Inserindo a data no pedido
const diaDoPedido = new Date()
const dataFormatada = diaDoPedido.toLocaleDateString('pt-BR')

//Perguntando se o cliente possui desconto
let cupomPerg = read.question("Tem algum cupom de desconto ? (S/N) ")

function desconto(desc,arr){
    if(desc.toLocaleUpperCase() == "S"){
        let cupomValor = read.question("Digite o valor do desconto:")
        const val = Number(cupomValor)
        let total = arr.reduce((total, currentElement) => total + currentElement)
        let calculando = total * (val/100)
        console.log(`DATA DA COMPRA: ${dataFormatada}`)
        console.log(`QUANTIDADE DE PRODUTOS: ${totalQuantidade}`)
        console.log(`SUBTOTAL: ${totalPreco}`)
        console.log(`DESCONTO: ${calculando} reais`)
        console.log(`TOTAL: ${totalPreco - calculando}`)
    
            console.log(`Digite um cupom valido`)
    }else {
        console.log(`DATA DA COMPRA: ${dataFormatada}`)
        console.log(`QUANTIDADE DE PRODUTOS: ${totalQuantidade}`)
        console.log(`SUBTOTAL: ${totalPreco}`)
        console.log(`TOTAL: ${totalPreco}`)
    }
}

desconto(cupomPerg, total)

