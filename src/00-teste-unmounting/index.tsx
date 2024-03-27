import React, { useEffect, useState, createContext, useContext } from "react";
import { Button, Dimensions, Text, View } from "react-native";

const { width, height } = Dimensions.get('screen')


const MeuContexto = createContext({} as { numero: number ; setNumero: React.Dispatch<React.SetStateAction<number >> })

export default () => {

    const [display, setDisplay] = useState<boolean>(true)
    const [numero, setNumero] = useState<number>(0)

    useEffect(() => {

        console.log('NUMERO MUDOU AQUI Ó')
        console.log('numero quando desmontou', numero)

    }, [numero])

    return (
        <MeuContexto.Provider value={{numero, setNumero}}>
            <View style={{ flex: 1 }}>

                {display && <ComponentText cor="#fff" />}

                <Button title="desmontar o component" onPress={() => setDisplay(prev => !prev)} />

            </View>
        </MeuContexto.Provider>
    )
}

const ComponentText = ({ cor }: { cor: string }) => {


    const [numeros, setNumeros] = useState(0)
    const { numero, setNumero } = useContext(MeuContexto)

    useEffect(() => {

        console.log('Montou')
        setNumero(prev => prev + 20)
        return () => {
            // reseta TODOS OS ESTADOS QUANDO ENTRA AQUI
            console.log('Desmontou')
            console.log('Estado do component demonstado', numeros)
            setNumero(prev => prev + 50)
        }

    }, [])

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', width: width, height: height / 2, backgroundColor: 'transparent' }} >
            <Text>Bom dia</Text>
            <Button title="AUMENTA" onPress={() => { setNumeros(prev => prev + 1); console.log(numeros) }} />
        </View>
    )

}