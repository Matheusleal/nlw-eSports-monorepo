import { useState } from 'react';
import { View, Text, Modal, Alert, ModalProps, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import { CheckCircle } from 'phosphor-react-native'
import * as Clipboard from 'expo-clipboard'

import { Heading } from '../Heading';

import { styles } from './styles';
import { THEME } from '../../theme';

interface Props extends ModalProps {
  discord: string
  onClose: () => void
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {

  const [isCopying, setIsCopying] = useState<boolean>(false)

  async function handleCopDiscordUserToClipboard() {

    try {
      setIsCopying(true)

      await Clipboard.setStringAsync(discord)

    } catch (error) {
      Alert.alert('erro!', 'não conseguimos copiar o usuário )=')
    }

    finally { setIsCopying(false) }


    Alert.alert('discord copiado!', 'Usuário copiado para o clipboard (=')
  }

  return (
    <Modal
      {...rest}
      transparent
      statusBarTranslucent
      animationType='slide'>
      <View style={styles.container}>

        <View style={styles.content}>

          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <MaterialIcons
              name='close'
              size={20}
              color={THEME.COLORS.CAPTION_500} />

          </TouchableOpacity>

          <CheckCircle
            size={64}
            color={THEME.COLORS.SUCCESS}
            weight='bold'
          />

          <Heading
            title="Let's play!"
            subtitle="Agora é só começar a jogar!"
            style={{ alignItems: 'center', marginTop: 24 }} />

          <Text style={styles.label}>
            Adicione do Discord
          </Text>

          <TouchableOpacity
            style={styles.discordButton}
            onPress={handleCopDiscordUserToClipboard}
            disabled={isCopying}>

            <Text style={styles.discord}>
              {isCopying ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}
            </Text>

          </TouchableOpacity>



        </View>



      </View>
    </Modal>
  );
}