import { create } from 'zustand';
import { createClient } from '@/lib/supabase/client';

export type Message = {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  is_read: boolean;
};

interface ChatState {
  messages: Message[];
  conversationId: string | null;
  isLoading: boolean;
  isOpen: boolean;
  
  setIsOpen: (open: boolean) => void;
  fetchMessages: (conversationId: string) => Promise<void>;
  sendMessage: (content: string, userId: string) => Promise<void>;
  subscribeToMessages: (conversationId: string) => void;
  unsubscribe: () => void;
  clearChat: () => Promise<void>;
}

const supabase = createClient();
const generateId = () => Math.random().toString(36).substring(2, 9) + Date.now().toString(36);

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  conversationId: null,
  isLoading: false,
  isOpen: false,

  setIsOpen: (open) => set({ isOpen: open }),

  fetchMessages: async (conversationId) => {
    // 1. تنظيف الرسائل القديمة أولاً لتجنب ظهور "شات قديم" بالخطأ
    set({ messages: [], isLoading: true, conversationId });
    
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (!error && data) {
      set({ messages: data as Message[] });
    }
    set({ isLoading: false });
  },

  sendMessage: async (content, userId) => {
    const { conversationId } = get();
    if (!conversationId) return;

    // إضافة الرسالة محلياً فوراً (Optimistic UI)
    const optimisticMessage: Message = {
        id: generateId(),
        conversation_id: conversationId,
        sender_id: userId,
        content,
        created_at: new Date().toISOString(),
        is_read: false
    };

    set((state) => ({ messages: [...state.messages, optimisticMessage] }));

    const { error } = await supabase.from('messages').insert({
      conversation_id: conversationId,
      sender_id: userId,
      content,
    });

    if (error) {
        console.error('Error sending message:', error);
    }
  },

  subscribeToMessages: (conversationId) => {
    const state = get();
    // إلغاء أي قناة قديمة
    supabase.removeAllChannels();

    console.log("🔌 Connecting to Chat Room:", conversationId);

    supabase
      .channel(`room:${conversationId}`) // اسم القناة
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const newMessage = payload.new as Message;
          console.log("📨 Received:", newMessage);

          set((currentState) => {
            // التحقق بالـ ID فقط لمنع التكرار
            // لو الرسالة موجودة بالفعل (أنا اللي باعتها)، متضيفهاش تاني
            // لو الرسالة جديدة (من الأدمن)، ضيفها فوراً
            
            // مقارنة تقريبية للتأكد إن الرسالة دي مش هي اللي أنا لسا باعتها (Optimistic)
            const isDuplicate = currentState.messages.some(m => 
                (m.content === newMessage.content && m.sender_id === newMessage.sender_id) || 
                m.id === newMessage.id
            );

            if (isDuplicate) return currentState;

            return { messages: [...currentState.messages, newMessage] };
          });
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') console.log("✅ Connected!");
      });
  },

  unsubscribe: () => {
    supabase.removeAllChannels();
  },

  clearChat: async () => {
      const { conversationId } = get();
      if (!conversationId) return;
      
      set({ messages: [] }); // مسح فوري من الشاشة
      await supabase.from('messages').delete().eq('conversation_id', conversationId);
  }
}));