"use client";

import { motion } from "framer-motion";
import { Users, Heart, MessageCircle, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { communityPosts } from "@/lib/content";

export default function CommunityPage() {
  return (
    <AppShell>
      <PageHeader
        title="Sacred Community"
        subtitle="Share your journey with fellow seekers"
        icon={<Users className="w-6 h-6" />}
      />

      {/* Post Composer Mock */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <Card className="bg-sacred-dark/60 border-gold/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                <span className="text-gold font-heading font-bold text-sm">
                  Y
                </span>
              </div>
              <Input
                placeholder="Share your reflection with the community..."
                className="bg-sacred-gray/30 border-gold/5 text-ivory placeholder:text-muted-foreground/30 focus:border-gold/20"
                readOnly
              />
              <Button
                size="sm"
                className="bg-gold/10 text-gold hover:bg-gold/15 flex-shrink-0"
                disabled
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-muted-foreground/30 text-[10px] text-center mt-2">
              Community features coming soon
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {communityPosts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
          >
            <Card className="bg-sacred-dark/40 border-gold/5 hover:border-gold/15 transition-all duration-300">
              <CardContent className="p-4">
                {/* Post Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
                    <span className="text-gold font-heading font-bold text-sm">
                      {post.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="text-ivory text-sm font-medium">
                      {post.author}
                    </p>
                    <p className="text-muted-foreground/40 text-[10px]">
                      {post.timeAgo}
                    </p>
                  </div>
                </div>

                {/* Post Content */}
                <p className="text-ivory/70 text-sm leading-relaxed mb-3">
                  {post.content}
                </p>

                {/* Post Actions */}
                <div className="flex items-center gap-4 pt-2 border-t border-gold/5">
                  <button className="flex items-center gap-1.5 text-muted-foreground/50 hover:text-gold transition-colors text-xs">
                    <Heart className="w-3.5 h-3.5" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-muted-foreground/50 hover:text-gold transition-colors text-xs">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{post.comments}</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* End of feed */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-center"
      >
        <div className="w-8 h-px bg-gold/20 mx-auto mb-3" />
        <p className="text-muted-foreground/30 text-xs">
          You&apos;re all caught up
        </p>
      </motion.div>
    </AppShell>
  );
}
