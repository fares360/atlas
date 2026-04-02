import AtlasPartView from "@/components/atlas/AtlasPartView";

// ID المجلد الثالث
const BOOK_ID = 'a0000003-0000-0000-0000-000000000003';

export default function Part3Page() {
  return <AtlasPartView bookId={BOOK_ID} partNumber={3} />;
}