import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    Modal,
    SafeAreaView,
    SectionList,
    Text,
    TextInput, TouchableOpacity,
    View
} from 'react-native';
import { sightsStyles } from '../constants/globalStyles'; // Імпорт стилей

const SIGHTS_DATA = [
  {
    title: 'Історичні пам’ятки',
    data: [
      { id: '1', name: 'Ратуша', desc: 'Старовинна будівля на площі Ринок.', img: 'https://picsum.photos/200' },
      { id: '2', name: 'Острів Тумський', desc: 'Найстаріша частина міста з грандіозним собором.', img: 'https://picsum.photos/201' },
    ],
  },
  {
    title: 'Парки та природа',
    data: [
      { id: '3', name: 'Щитницький парк', desc: 'Величезний зелений масив із Японським садом.', img: 'https://picsum.photos/202' },
    ],
  },
];

export default function SightsScreen() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [searchText, setSearchText] = useState('');

  const handleLike = (name: string) => {
    Alert.alert('Успіх!', `Ви додали "${name}" в обране`);
  };

  const openDetails = (item: any) => {
    setSelectedPlace(item);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={sightsStyles.container}>
      <TouchableOpacity onPress={() => router.back()} style={sightsStyles.backButton}>
        <Text style={sightsStyles.backText}>← Назад</Text>
      </TouchableOpacity>

      <Text style={sightsStyles.title}>Пам'ятки міста</Text>

      <TextInput
        style={sightsStyles.input}
        placeholder="Пошук пам'яток..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <SectionList
        sections={SIGHTS_DATA}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={sightsStyles.sectionHeader}>{title}</Text>
        )}
        renderItem={({ item }) => (
          <View style={sightsStyles.card}>
            <Image source={{ uri: item.img }} style={sightsStyles.image} />
            <View style={sightsStyles.cardContent}>
              <Text style={sightsStyles.itemName}>{item.name}</Text>
              <View style={sightsStyles.row}>
                <TouchableOpacity style={sightsStyles.detailsBtn} onPress={() => openDetails(item)}>
                  <Text style={sightsStyles.btnText}>Деталі</Text>
                </TouchableOpacity>
                <TouchableOpacity style={sightsStyles.likeBtn} onPress={() => handleLike(item.name)}>
                  <Text style={sightsStyles.btnText}>❤</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={sightsStyles.modalOverlay}>
          <View style={sightsStyles.modalContent}>
            {selectedPlace && (
              <>
                <Text style={sightsStyles.modalTitle}>{selectedPlace.name}</Text>
                <Text style={sightsStyles.modalDesc}>{selectedPlace.desc}</Text>
                <TouchableOpacity 
                  style={sightsStyles.closeBtn} 
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={sightsStyles.btnText}>Закрити</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}