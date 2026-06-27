import { StyleSheet } from 'react-native';

// ==========================================
// ЗАДАЧІ 1 та 2 (Місто Вроцлав та Пам'ятки)
// ==========================================

export const cityStyles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f8fafc' },
  container: { padding: 24, alignItems: 'center' },
  headerTitle: { fontSize: 34, fontWeight: 'bold', color: '#1e293b', marginBottom: 20, marginTop: 10, letterSpacing: 0.5 },
  cityImage: { width: '100%', height: 240, borderRadius: 16, borderWidth: 1, borderColor: '#e2e8f0', marginBottom: 24 },
  descriptionContainer: { backgroundColor: '#ffffff', padding: 20, borderRadius: 16, shadowColor: '#0f172a', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 2, marginBottom: 24 },
  descriptionText: { fontSize: 16, lineHeight: 26, color: '#334155', textAlign: 'justify' },
  navigationButton: { backgroundColor: '#2dd4bf', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 12, width: '100%', alignItems: 'center', elevation: 3 },
  navigationButtonText: { color: '#ffffff', fontSize: 18, fontWeight: '700' },
});

export const sightsStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5', padding: 20 },
  backButton: { marginBottom: 10, marginTop: 10 },
  backText: { color: '#007AFF', fontSize: 18 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 15 },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 20, borderWidth: 1, borderColor: '#ddd' },
  sectionHeader: { fontSize: 20, fontWeight: 'bold', backgroundColor: '#e2e8f0', padding: 8, borderRadius: 5, marginVertical: 10, color: '#1e293b' },
  card: { backgroundColor: '#fff', borderRadius: 12, marginBottom: 15, flexDirection: 'row', overflow: 'hidden', elevation: 3 },
  image: { width: 100, height: 100 },
  cardContent: { padding: 10, flex: 1, justifyContent: 'space-between' },
  itemName: { fontSize: 18, fontWeight: '600' },
  row: { flexDirection: 'row', gap: 10 },
  detailsBtn: { backgroundColor: '#007AFF', padding: 8, borderRadius: 5 },
  likeBtn: { backgroundColor: '#ff4757', padding: 8, borderRadius: 5 },
  btnText: { color: '#fff', fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', padding: 30, borderRadius: 20, width: '80%', alignItems: 'center' },
  modalTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  modalDesc: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
  closeBtn: { backgroundColor: '#333', padding: 10, borderRadius: 8 }
});

// ==========================================
// ЗАДАННЯ 3 (Додаток Новин із динамічною темою)
// ==========================================

export const createLayoutStyles = (colors: any) =>
  StyleSheet.create({
    tabBar: {
      backgroundColor: colors.surface,
      borderTopColor: colors.border,
      borderTopWidth: 1,
      height: 60,
      paddingBottom: 8,
    },
  });

export const createNewsStyles = (colors: any) =>
  StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.bg },
    container: { flex: 1, padding: 16 },
    headerTitle: { fontSize: 28, fontWeight: 'bold', color: colors.text, marginBottom: 20, textAlign: 'center' },
    card: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 12,
      padding: 16,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
    cardTitle: { fontSize: 20, fontWeight: 'bold', color: colors.text, marginBottom: 8 },
    cardBody: { fontSize: 16, color: colors.textMuted, lineHeight: 22, marginBottom: 16 },
    cardButton: { backgroundColor: colors.primary, paddingVertical: 10, paddingHorizontal: 16, borderRadius: 6, alignSelf: 'flex-start' },
    cardButtonText: { color: '#FFFFFF', fontWeight: '600' },
  });

export const createSettingsStyles = (colors: any) =>
  StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.bg },
    container: { flex: 1, padding: 16, justifyContent: 'center', alignItems: 'center' },
    title: { color: colors.text, fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
    button: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      backgroundColor: colors.primary,
      borderRadius: 8,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  });