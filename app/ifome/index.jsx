import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { Link } from 'expo-router';

const CarrinhoContext = React.createContext();

const IFome = () => {
    const produtos = [
        {
            id: '1',
            nome: 'Chicken Jr',
            descricao: 'McDonalds | Shopping Continente',
            preco: 'R$ 16',
            imagem: require('../../assets/images/chiken.png'), 
        },
        {
            id: '2',
            nome: 'Super Coxinha',
            descricao: 'Castro Lanches',
            preco: 'R$ 2,50',
            imagem: require('../../assets/images/Coxinha.png'), 
        },
        {
            id: '3',
            nome: 'Doguinho da Cantina',
            descricao: 'Cantina Sesi Senai',
            preco: 'R$ 25,00',
            imagem: require('../../assets/images/doguinho.png'),
        },
    ];

    const { itensCarrinho, adicionarAoCarrinho } = useContext(CarrinhoContext);

    const renderProduto = ({ item }) => (
        <View style={styles.produto}>
            <Image source={item.imagem} style={styles.produtoImagem} />
            <View style={styles.produtoInfo}>
                <Text style={styles.produtoNome}>{item.nome}</Text>
                <Text style={styles.produtoDescricao}>{item.descricao}</Text>
                <Text style={styles.produtoPreco}>{item.preco}</Text>
                <TouchableOpacity 
                    style={styles.botaoComprar}
                    onPress={() => adicionarAoCarrinho(item)}
                >
                    <Text style={styles.botaoTexto}>COMPRAR</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.cabecalho}>
                <Text style={styles.title}>iFome</Text>
                <View style={styles.carrinho}>
                    <Link href="/Carrinho">
                        <Image
                            source={require('../../assets/images/carrinho.png')} 
                            style={styles.image}
                        />
                        <Text style={styles.textCarrinho}>{itensCarrinho.length} itens</Text>
                    </Link>
                </View>
            </View>
            
            <View style={styles.fundoProdutos}>
                <FlatList
                    data={produtos}
                    renderItem={renderProduto}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listaProdutos}
                />
            </View>
        </View>
    );
};

const CarrinhoProvider = ({ children }) => {
    const [itensCarrinho, setItensCarrinho] = useState([]);

    const adicionarAoCarrinho = (produto) => {
        setItensCarrinho([...itensCarrinho, produto]);
    };

    return (
        <CarrinhoContext.Provider value={{ itensCarrinho, adicionarAoCarrinho }}>
            {children}
        </CarrinhoContext.Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    cabecalho: {
        backgroundColor: 'red',
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: 28,
        flex: 1,
        textAlign: 'center',
    },
    image: {
        width: 25,
        height: 25,
    },
    carrinho: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textCarrinho: {
        marginLeft: 5,
        color: 'white',
        fontSize: 16,
    },
    fundoProdutos: {
        backgroundColor: '#fff9e6',
        flex: 1,
        padding: 10,
    },
    listaProdutos: {
        flexGrow: 1,
    },
    produto: {
        backgroundColor: '#f9f9f9',
        marginBottom: 20,
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
    },
    produtoImagem: {
        width: 150,
        height: 150,
        borderRadius: 10,
        marginBottom: 10,
    },
    produtoInfo: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    produtoNome: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    produtoDescricao: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    produtoPreco: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 5,
        textAlign: 'center',
    },
    botaoComprar: {
        marginTop: 10,
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        width: 120,
        alignItems: 'center',
    },
    botaoTexto: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default () => (
    <CarrinhoProvider>
        <IFome />
    </CarrinhoProvider>
);
