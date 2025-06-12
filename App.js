import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

function CronometroApp() {
  const [contador, setContador] = useState(0);
  const [intervaloId, setIntervaloId] = useState(null);
  const [ativo, setAtivo] = useState(false);

  const formatarTempo = (tempo) => {
    const minutos = Math.floor(tempo / 60000);
    const segundos = Math.floor((tempo % 60000) / 1000);
    const milissegundos = Math.floor((tempo % 1000) / 10);

    return `${minutos.toString().padStart(2, '0')}:${segundos
      .toString()
      .padStart(2, '0')}:${milissegundos.toString().padStart(2, '0')}`;
  };

  const iniciarContagem = () => {
    if (!ativo) {
      setAtivo(true);
      const id = setInterval(() => {
        setContador((valorAtual) => valorAtual + 10);
      }, 10);
      setIntervaloId(id);
    }
  };

  const pausarContagem = () => {
    if (ativo) {
      clearInterval(intervaloId);
      setAtivo(false);
      setIntervaloId(null);
    }
  };

  const reiniciarContagem = () => {
    if (intervaloId) {
      clearInterval(intervaloId);
    }
    setAtivo(false);
    setContador(0);
    setIntervaloId(null);
  };

  return (
    <View style={estilos.areaPrincipal}>
      <Text style={estilos.displayCronometro}>{formatarTempo(contador)}</Text>

      <View style={estilos.conjuntoBotoes}>
        <Button
          title={ativo ? "Parar" : "Iniciar"}
          onPress={ativo ? pausarContagem : iniciarContagem}
        />
        <Button title="Reiniciar" onPress={reiniciarContagem} />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const estilos = StyleSheet.create({
  areaPrincipal: {
    flex: 1,
    backgroundColor: '#e3f2fd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  displayCronometro: {
    fontSize: 50,
    fontWeight: '900',
    color: '#1e88e5',
    marginBottom: 25,
  },
  conjuntoBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    gap: 15,
  },
});

export default CronometroApp;
