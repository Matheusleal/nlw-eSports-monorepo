import React, { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { GameController } from 'phosphor-react-native'

import { THEME } from '../../theme';
import { DuoInfo } from '../DuoInfo';

import { styles } from './styles';

export interface DuoCardProps {
  HourStart: string
  hourend: string
  id: string,
  name: string,
  useVoiceChannel: boolean,
  weekDays: string[],
  yearsPlaying: number
}

interface Props {
  data: DuoCardProps
  onConnect: () => void
}

export function DuoCard({ data, onConnect }: Props) {

  return (
    <View style={styles.container}>
      <DuoInfo
        label='Nome'
        value={data.name}
      />

      <DuoInfo
        label='Tempo de Jogo'
        value={`${data.yearsPlaying} ${data.yearsPlaying == 1 ? 'ano' : 'anos'}`}
      />

      <DuoInfo
        label='Disponibilidade'
        value={`${data.weekDays.length} ${data.weekDays.length == 1 ? 'dia' : 'dias'} \u2022 ${data.HourStart} - ${data.hourend}`}
      />

      <DuoInfo
        label='Chamada de Aúdio'
        value={data.useVoiceChannel ? 'sim' : 'não'}
        colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
      />

      <TouchableOpacity style={styles.button} onPress={onConnect}>

        <GameController
          color={THEME.COLORS.TEXT}
          size={20}
        />

        <Text style={styles.buttonTitle}>Conectar</Text>

      </TouchableOpacity>

    </View>
  );
}