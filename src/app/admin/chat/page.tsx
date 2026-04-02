'use client';

import { useEffect, useState, useRef } from 'react';
import { useAdminChatStore } from '@/lib/store/admin-chat-store';
import { createClient } from '@/lib/supabase/client';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, User, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminChatPage() {
  const { 
    conversations, selectedConversationId, messages, 
    fetchConversations, selectConversation, sendMessage, subscribeToAll 
  } = useAdminChatStore();
  
  const [input, setInput] = useState('');
  const [adminId, setAdminId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  // الحصول على اسم المحادثة الحالية (للعرض في الهيدر)
  const currentConversation = conversations.find(c => c.id === selectedConversationId);
  const currentUserName = currentConversation?.profiles?.full_name || "زائر مجهول";

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setAdminId(session.user.id);
        await fetchConversations();
        subscribeToAll();
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !adminId) return;
    await sendMessage(input, adminId);
    setInput('');
  };

  return (
    <div className="flex h-[calc(100vh-100px)] border rounded-xl overflow-hidden bg-white shadow-sm mt-4">
      
      {/* 2. Sidebar: Conversations List (يمين - افتراضي للعربية) */}
      <div className="w-1/3 border-l bg-gray-50 flex flex-col">
        <div className="p-4 border-b bg-white font-bold text-gray-700 flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            المحادثات النشطة
        </div>
        <ScrollArea className="flex-1">
          {conversations.length === 0 ? (
             <div className="p-8 text-center text-gray-400">لا توجد محادثات</div>
          ) : (
            conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => selectConversation(conv.id)}
                className={cn(
                  "p-4 border-b cursor-pointer hover:bg-gray-100 transition-colors flex items-center gap-3",
                  selectedConversationId === conv.id ? "bg-blue-50 border-r-4 border-r-[#2A5B68]" : ""
                )}
              >
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                    <User className="h-6 w-6 text-gray-500" />
                </div>
                <div className="flex-1 overflow-hidden">
                  {/* هنا التعديل: عرض الاسم بدلاً من ID */}
                  <p className="font-bold text-sm truncate text-gray-800">
                    {conv.profiles?.full_name || `زائر #${conv.user_id.slice(0, 4)}`}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(conv.updated_at).toLocaleDateString('ar-EG', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))
          )}
        </ScrollArea>
      </div>

      {/* 1. Main: Chat Area (يسار) */}
      <div className="flex-1 flex flex-col bg-white">
        {!selectedConversationId ? (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <MessageSquare className="h-16 w-16 mb-4 opacity-20" />
            <p>اختر محادثة من القائمة للبدء</p>
          </div>
        ) : (
          <>
            {/* Header: اسم الزائر الذي نتحدث معه */}
            <div className="p-4 border-b flex items-center gap-3 bg-gray-50/50">
                <div className="h-8 w-8 rounded-full bg-[#2A5B68] text-white flex items-center justify-center text-xs">
                    {currentUserName.charAt(0)}
                </div>
                <div>
                    <span className="font-bold text-gray-800 block">{currentUserName}</span>
                    <span className="text-xs text-green-600 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        نشط الآن
                    </span>
                </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-6 bg-slate-50">
              <div className="space-y-4">
                {messages.map((msg) => {
                  const isAdmin = msg.sender_id === adminId;
                  return (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex w-full",
                        isAdmin ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[70%] rounded-xl px-4 py-2 text-sm shadow-sm",
                          isAdmin
                            ? "bg-[#2A5B68] text-white rounded-br-none"
                            : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"
                        )}
                      >
                        {msg.content}
                        <div className={cn("text-[10px] mt-1 opacity-70", isAdmin ? "text-right" : "text-left")}>
                            {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t bg-white flex gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="اكتب ردك هنا..."
                className="flex-1"
              />
              <Button onClick={handleSend} disabled={!input.trim()} className="bg-[#D4AF37] hover:bg-[#B5952F] text-white">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </div>

    </div>
  );
}