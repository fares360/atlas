import AtlasPartView from "@/components/atlas/AtlasPartView";

// ID المجلد الثاني
const BOOK_ID = 'a0000002-0000-0000-0000-000000000002';

export default function Part2Page() {
  return <AtlasPartView bookId={BOOK_ID} partNumber={2} />;
}