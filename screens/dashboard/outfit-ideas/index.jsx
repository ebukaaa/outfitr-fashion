import { useStore } from "./utils";

export function useOutfitIdeas() {
  const {
    styles: { appStyles, contentStyles, cardsStyles },
    cards,
    feeds,
    View,
    FlatList,
    Text,
    Card,
    Overlay,
  } = useStore();

  return (
    <View style={appStyles}>
      <Overlay />

      <View style={contentStyles}>
        <View>
          <FlatList
            horizontal
            data={feeds}
            renderItem={({ item: { id, styles } }) => <View style={styles} />}
          />
        </View>

        <View style={cardsStyles}>
          {cards.map((_, index) => (
            <Card key={String(index)} index={index} />
          ))}
        </View>
      </View>
    </View>
  );
}
