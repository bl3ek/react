import { Link } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { cityStyles } from '../constants/globalStyles'; // Імпорт стилей

export default function CityScreen() {
  return (
    <SafeAreaView style={cityStyles.safeArea}>
      <ScrollView contentContainerStyle={cityStyles.container}>
        
        <Text style={cityStyles.headerTitle}>Вроцлав</Text>

        <Image
          source={require('../assets/images/city.jpg')}
          style={cityStyles.cityImage}
        />

        <View style={cityStyles.descriptionContainer}>
          <Text style={cityStyles.descriptionText}>
            Вроцлав — одне з найстаріших і наймальовничіших міст Польщі, розташоване на 12 островах річки Одра. 
            Воно всесвітньо відоме своєю унікальною архітектурою площі Ринок та сотнями маленьких бронзових гномів, які заховані по всьому місту. 
            Це динамічний культурний центр із затишною атмосферою, який закохує в себе з першого погляду.
          </Text>
        </View>

        <Link href="/sights" asChild>
          <TouchableOpacity style={cityStyles.navigationButton} activeOpacity={0.8}>
            <Text style={cityStyles.navigationButtonText}>Відкрити пам'ятки міста →</Text>
          </TouchableOpacity>
        </Link>

      </ScrollView>
    </SafeAreaView>
  );
}