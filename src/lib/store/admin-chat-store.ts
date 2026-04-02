import { create } from 'zustand';
import { createClient } from '@/lib/supabase/client';
import { Message } from './chat-store';

type Profile = { full_name: string | null; phone: string | null; };
type Conversation = {
  id: string;
  user_id: string;
  status: string;
  updated_at: string;
  profiles: Profile | null;
};

interface AdminChatState {
  conversations: Conversation[];
  selectedConversationId: string | null;
  messages: Message[];
  isLoading: boolean;
  
  fetchConversations: () => Promise<void>;
  selectConversation: (id: string) => Promise<void>;
  sendMessage: (content: string, adminId: string) => Promise<void>;
  subscribeToAll: () => void;
}

const supabase = createClient();

export const useAdminChatStore = create<AdminChatState>((set, get) => ({
  conversations: [],
  selectedConversationId: null,
  messages: [],
  isLoading: false,

  fetchConversations: async () => {
    // لا نعرض اللودينج هنا عشان لا يحصل "وميض" كل شوية
    const { data, error } = await supabase
      .from('conversations')
      .select('*, profiles(full_name, phone)') 
      .order('updated_at', { ascending: false });

    if (!error && data) {
      set({ conversations: data as unknown as Conversation[] });
    }
  },

  selectConversation: async (id) => {
    set({ selectedConversationId: id, isLoading: true });
    
    // جلب الرسائل القديمة
    const { data } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', id)
      .order('created_at', { ascending: true });
      
    if (data) set({ messages: data as Message[] });
    set({ isLoading: false });
  },

  sendMessage: async (content, adminId) => {
    const { selectedConversationId } = get();
    if (!selectedConversationId) return;

    // Optimistic Update (عرض فوري للأدمن)
    const tempMsg: Message = {
        id: Math.random().toString(),
        conversation_id: selectedConversationId,
        sender_id: adminId,
        content,
        created_at: new Date().toISOString(),
        is_read: true
    };
    set(state => ({ messages: [...state.messages, tempMsg] }));

    await supabase.from('messages').insert({
      conversation_id: selectedConversationId,
      sender_id: adminId,
      content,
    });
    
    // لا نحتاج لتحديث الوقت يدوياً لأننا عملنا Trigger في قاعدة البيانات
  },

  subscribeToAll: () => {
    const channel = supabase.channel('admin-dashboard');

    channel
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
            const state = get();
            const newMessage = payload.new as Message;
            
            console.log("🔔 New message for Admin:", newMessage);

            // 1. لو الأدمن فاتح نفس المحادثة، اعرض الرسالة فوراً
            if (state.selectedConversationId === newMessage.conversation_id) {
                // تأكد أن الرسالة ليست رسالتي (عشان التكرار)
                const isMyMessage = state.messages.some(m => m.content === newMessage.content && Math.abs(new Date(m.created_at).getTime() - new Date(newMessage.created_at).getTime()) < 2000);
                
                if (!isMyMessage) {
                    set((prev) => ({ messages: [...prev.messages, newMessage] }));
                }
            }
            
            // 2. في كل الأحوال، حدث القائمة الجانبية (عشان المحادثة تطلع فوق)
            get().fetchConversations();
        }
      )
      .subscribe();
  }
}));