import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const reviewsData = [
  {
    id: '1',
    title: 'Easyship made logistics simple!',
    user: 'Ravi Kumar',
    date: '07/08/25',
    rating: 5,
    content:
      'Easyship E-Transport streamlined our shipping with real-time tracking and secure deliveries. Highly recommended for businesses.',
  },
  {
    id: '2',
    title: 'Reliable and Fast Service',
    user: 'Priya Sharma',
    date: '15/06/25',
    rating: 4,
    content:
      'Booking transport is so easy now. The app keeps us updated and drivers are professional.',
  },
];

const ReviewCard = ({ review }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.title}>{review.title}</Text>
        <Text style={styles.userDate}>{review.user} • {review.date}</Text>
      </View>
      <View style={styles.starsRow}>
        {Array.from({ length: 5 }).map((_, i) => (
          <FontAwesome
            key={i}
            name={i < review.rating ? 'star' : 'star-o'}
            size={16}
            color="#FFA500"
            style={{ marginRight: 4 }}
          />
        ))}
      </View>
      <Text style={styles.content}>{review.content}</Text>
    </View>
  );
};

const RatingsScreen = () => {
  const averageRating = 4.6;
  const totalReviews = 429;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rating & Reviews</Text>
      <View style={styles.ratingRow}>
        <Text style={styles.ratingText}>{averageRating} ⭐</Text>
        <Text style={styles.totalReviews}>{totalReviews} Reviews</Text>
      </View>
      <FlatList
        data={reviewsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReviewCard review={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color:"#0047AB"
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFA500',
    marginRight: 8,
  },
  totalReviews: {
    fontSize: 16,
    color: '#777',
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#F5F7FA',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  userDate: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  starsRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    color: '#444',
  },
});

export default RatingsScreen;
