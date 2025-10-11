"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  CheckCircle, 
  XCircle, 
  Trash2, 
  User,
  ThumbsUp,
  Reply
} from "lucide-react"
import { Comment as CommentType } from "@/lib/comment-service"

// Modal Reply Item Component (Recursive)
export function ModalReplyItem({
  reply,
  index,
  parentComment,
  onStatusChange,
  onDelete,
  onLike,
  likedComments,
  formatDate,
  onReply
}: {
  reply: CommentType & { adminReplies?: CommentType[] }
  index: number
  parentComment?: CommentType | null
  onStatusChange: (id: string, approved: boolean) => void
  onDelete: (id: string) => void
  onLike: (id: string) => void
  likedComments: Set<string>
  formatDate: (timestamp: any) => string
  onReply?: (comment: CommentType) => void
}) {
  return (
    <div className="relative group" id={`comment-${reply.id}`}>
      {/* Yanıt Çizgisi */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/40 via-cyan-500/20 to-transparent group-hover:from-cyan-500/60 group-hover:via-cyan-500/30 transition-all duration-300"></div>
      
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
        className={`glass rounded-2xl p-6 border transition-all duration-300 ml-6 relative group-hover:scale-[1.02] group-hover:shadow-lg ${
        reply.isRejected === true
            ? 'border-red-500/50 shadow-red-500/20 opacity-75'
            : reply.authorEmail === 'admin@softiel.com'
            ? 'border-cyan-500/30 shadow-cyan-500/10 hover:border-cyan-500/50 hover:shadow-cyan-500/20'
            : 'border-white/5 hover:border-white/10'
      }`}
      style={{
        background: reply.isRejected === true
            ? 'rgba(239, 68, 68, 0.08)'
            : reply.authorEmail === 'admin@softiel.com'
            ? 'rgba(6, 182, 212, 0.08)'
            : 'rgba(255, 255, 255, 0.02)',
        boxShadow: reply.isRejected === true
            ? '0 4px 20px rgba(239, 68, 68, 0.1)'
            : reply.authorEmail === 'admin@softiel.com'
            ? '0 4px 20px rgba(6, 182, 212, 0.1)'
            : '0 2px 10px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Reddedildi Overlay */}
      {reply.isRejected === true && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-red-500/5 border-2 border-red-500/20 rounded-2xl flex items-center justify-center pointer-events-none">
          <div className="bg-red-500/20 backdrop-blur-sm px-3 py-1 rounded-lg border border-red-500/30">
            <div className="flex items-center space-x-2">
              <XCircle className="h-4 w-4 text-red-400" />
              <span className="text-red-300 font-semibold text-xs">REDDEDİLDİ</span>
            </div>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3">
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:scale-110 flex-shrink-0 ${
            reply.authorEmail === 'admin@softiel.com' 
              ? 'ring-2 ring-cyan-500/40 ring-offset-2 ring-offset-transparent group-hover:ring-cyan-500/60' 
              : 'ring-1 ring-white/10 group-hover:ring-white/20'
          }`} 
               style={{ background: reply.authorEmail === 'admin@softiel.com' 
                 ? 'rgba(6, 182, 212, 0.15)' 
                 : 'linear-gradient(135deg, #8b5cf6, #a855f7)' }}>
            {reply.authorEmail === 'admin@softiel.com' ? (
              <img 
                src="/transparent.webp" 
                alt="Admin" 
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-1 sm:space-y-0 mb-1">
              <h5 className={`font-semibold text-sm sm:text-base truncate ${
                reply.authorEmail === 'admin@softiel.com'
                  ? 'text-cyan-200'
                  : 'text-white'
              }`}>{reply.authorName}</h5>
              {reply.authorEmail === 'admin@softiel.com' ? (
                <div className="flex items-center space-x-1 px-2 py-1 bg-cyan-500/20 rounded-full border border-cyan-500/30 group-hover:bg-cyan-500/30 transition-all duration-300 w-fit">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-cyan-300 font-medium">Admin</span>
                </div>
              ) : (
                <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full border border-purple-500/30 group-hover:bg-purple-500/30 transition-all duration-300 w-fit">
                  Kullanıcı
                </span>
              )}
            </div>
            <span className="text-xs text-neutral-500 group-hover:text-neutral-400 transition-colors duration-300">{formatDate(reply.createdAt)}</span>
            
            {/* Status göstergesi */}
            <div className="mt-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                reply.isRejected === true
                  ? 'text-red-400 bg-red-500/20 border border-red-500/30' 
                  : reply.isApproved 
                  ? 'text-green-400 bg-green-500/20 border border-green-500/30' 
                  : 'text-yellow-400 bg-yellow-500/20 border border-yellow-500/30'
              }`}>
                {reply.isRejected === true ? 'Reddedildi' : reply.isApproved ? 'Onaylandı' : 'Beklemede'}
              </span>
            </div>
            
            {/* Kime cevap verildiği bilgisi */}
            {parentComment && (
              <div className="mt-2 flex items-center space-x-2">
                <span className="text-xs text-neutral-400">↳</span>
                <span className="text-xs text-neutral-500">
                  <span className="text-neutral-400">Yanıt:</span> 
                  <span className="ml-1 text-neutral-300 font-medium">
                    {parentComment.authorName}
                  </span>
                  <span className="ml-1 text-neutral-500">
                    "{parentComment.content.length > 50 ? parentComment.content.substring(0, 50) + '...' : parentComment.content}"
                  </span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* İçerik */}
      <div className="mb-5">
        <p className={`text-base leading-relaxed break-words overflow-wrap-anywhere hyphens-auto ${
          reply.authorEmail === 'admin@softiel.com'
            ? 'text-cyan-100 font-medium'
            : 'text-neutral-200'
        }`}>{reply.content}</p>
        {reply.authorEmail === 'admin@softiel.com' && (
          <div className="mt-3 inline-flex items-center space-x-1 px-2 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20">
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
            <span className="text-xs text-cyan-400 font-medium">Resmi Yanıt</span>
          </div>
        )}
      </div>

      {/* Aksiyonlar */}
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex items-center space-x-4">
          {reply.isApproved ? (
            <button
              onClick={() => onLike(reply.id!)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-200 group/like ${
                likedComments.has(reply.id!)
                  ? 'bg-cyan-500/20 text-cyan-400 shadow-cyan-500/20'
                  : 'text-neutral-400 hover:text-cyan-400 hover:bg-cyan-500/10'
              }`}
            >
              <ThumbsUp className={`h-4 w-4 transition-transform duration-200 group-hover/like:scale-110 ${likedComments.has(reply.id!) ? 'fill-current' : ''}`} />
              <span className="text-sm font-medium">{reply.likes || 0}</span>
            </button>
          ) : (
            <div className="flex items-center space-x-2 px-3 py-2 text-yellow-300/60">
              <ThumbsUp className="h-4 w-4" />
              <span className="text-sm font-medium">{reply.likes || 0}</span>
              <span className="text-xs text-yellow-400/60 ml-2">(Beklemede)</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {reply.isRejected !== true && !reply.isApproved && (
            <button
              type="button"
              onClick={() => onStatusChange(reply.id!, true)}
              className="flex items-center space-x-2 px-3 py-2 text-green-400 hover:bg-green-500/20 rounded-xl transition-all duration-200 text-sm font-medium hover:scale-105"
            >
              <CheckCircle className="h-4 w-4" />
              <span>Onayla</span>
            </button>
          )}

          {reply.isRejected !== true && !reply.isApproved && (
            <button
              type="button"
              onClick={() => onStatusChange(reply.id!, false)}
              className="flex items-center space-x-2 px-3 py-2 text-red-400 hover:bg-red-500/20 rounded-xl transition-all duration-200 text-sm font-medium hover:scale-105"
            >
              <XCircle className="h-4 w-4" />
              <span>Reddet</span>
            </button>
          )}
          

          {onReply && reply.isRejected !== true && reply.isApproved && (
            <button
              type="button"
              onClick={() => onReply(reply)}
              className="flex items-center space-x-2 px-3 py-2 text-cyan-400 hover:bg-cyan-500/20 rounded-xl transition-all duration-200 text-sm font-medium hover:scale-105"
            >
              <Reply className="h-4 w-4" />
              <span>Yanıtla</span>
            </button>
          )}

          {reply.isApproved && (
            <button
              type="button"
              onClick={() => onDelete(reply.id!)}
              className="flex items-center space-x-2 px-3 py-2 text-red-400 hover:bg-red-500/20 rounded-xl transition-all duration-200 text-sm font-medium hover:scale-105"
            >
              <Trash2 className="h-4 w-4" />
              <span>Sil</span>
            </button>
          )}
        </div>
      </div>

      {/* Admin Yanıtları */}
      {reply.adminReplies && reply.adminReplies.length > 0 && (
        <div className="mt-6 space-y-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-px bg-gradient-to-r from-cyan-500/40 to-transparent flex-1"></div>
            <span className="text-xs text-cyan-400 px-3 py-1.5 bg-cyan-500/10 rounded-full border border-cyan-500/30 font-medium">
              {reply.adminReplies.length} admin yanıtı
            </span>
            <div className="h-px bg-gradient-to-l from-cyan-500/40 to-transparent flex-1"></div>
          </div>
          <div className="space-y-4">
          {reply.adminReplies.map((adminReply, adminIndex) => (
              <div key={`admin-${adminReply.id}-${adminIndex}`} className="relative">
                {/* Admin yanıt çizgisi */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/40 via-cyan-500/20 to-transparent"></div>
                
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: adminIndex * 0.1, duration: 0.4 }}
                  className="glass rounded-xl p-5 border border-cyan-500/20 shadow-cyan-500/5 hover:border-cyan-500/30 hover:shadow-cyan-500/10 transition-all duration-300 ml-4 relative hover:scale-[1.01] hover:shadow-md"
                  style={{
                    background: 'rgba(6, 182, 212, 0.05)',
                    boxShadow: '0 2px 8px rgba(6, 182, 212, 0.05)'
                  }}
                >
                  {/* Admin yanıt içeriği */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden ring-1 ring-cyan-500/30" 
                           style={{ background: 'rgba(6, 182, 212, 0.1)' }}>
                        <img 
                          src="/transparent.webp" 
                          alt="Admin" 
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-semibold text-cyan-200">Admin</span>
                          <div className="flex items-center space-x-1 px-2 py-1 bg-cyan-500/20 rounded-full border border-cyan-500/30">
                            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                            <span className="text-xs text-cyan-300 font-medium">Admin</span>
                          </div>
                        </div>
                        <span className="text-xs text-neutral-500">{formatDate(adminReply.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Admin yanıt içeriği */}
                  <div className="mb-4">
                    <p className="text-sm leading-relaxed text-cyan-100 font-medium break-words overflow-wrap-anywhere hyphens-auto">
                      {adminReply.content}
                    </p>
                    <div className="mt-3 inline-flex items-center space-x-1 px-2 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                      <span className="text-xs text-cyan-400 font-medium">Resmi Yanıt</span>
                    </div>
                  </div>

                  {/* Admin yanıtının alt yanıtları */}
                  {adminReply.replies && adminReply.replies.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="h-px bg-gradient-to-r from-cyan-500/30 to-transparent flex-1"></div>
                        <span className="text-xs text-cyan-300 px-2 py-1 bg-cyan-500/5 rounded-full border border-cyan-500/20 font-medium">
                          {adminReply.replies.length} alt yanıt
                        </span>
                        <div className="h-px bg-gradient-to-l from-cyan-500/30 to-transparent flex-1"></div>
                      </div>
                      {adminReply.replies.map((subReply, subIndex) => (
                        <div key={`sub-${subReply.id}-${subIndex}`} className="relative">
                          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/30 via-cyan-500/15 to-transparent"></div>
                          
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: subIndex * 0.1, duration: 0.3 }}
                            className="glass rounded-lg p-4 border border-cyan-500/15 shadow-cyan-500/5 hover:border-cyan-500/25 transition-all duration-300 ml-3"
                            style={{
                              background: 'rgba(6, 182, 212, 0.03)',
                              boxShadow: '0 1px 4px rgba(6, 182, 212, 0.03)'
                            }}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 rounded-full flex items-center justify-center overflow-hidden ring-1 ring-cyan-500/20" 
                                     style={{ background: 'rgba(6, 182, 212, 0.08)' }}>
                                  <img 
                                    src="/transparent.webp" 
                                    alt="Admin" 
                                    className="w-full h-full object-cover rounded-full"
                                  />
                                </div>
                                <div>
                                  <div className="flex items-center space-x-1">
                                    <span className="text-xs font-semibold text-cyan-200">Admin</span>
                                    <div className="flex items-center space-x-1 px-1.5 py-0.5 bg-cyan-500/15 rounded-full border border-cyan-500/25">
                                      <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
                                      <span className="text-xs text-cyan-300 font-medium">Admin</span>
                                    </div>
                                  </div>
                                  <span className="text-xs text-neutral-500">{formatDate(subReply.createdAt)}</span>
                                </div>
                              </div>
                            </div>

                            <div className="mb-2">
                              <p className="text-xs leading-relaxed text-cyan-100 font-medium break-words overflow-wrap-anywhere hyphens-auto">
                                {subReply.content}
                              </p>
                              <div className="mt-2 inline-flex items-center space-x-1 px-1.5 py-0.5 bg-cyan-500/8 rounded-full border border-cyan-500/15">
                                <div className="w-1 h-1 bg-cyan-400 rounded-full"></div>
                                <span className="text-xs text-cyan-400 font-medium">Resmi Yanıt</span>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recursive Replies */}
      {reply.replies && reply.replies.length > 0 && (
        <div className="mt-6 space-y-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-px bg-gradient-to-r from-cyan-500/40 to-transparent flex-1"></div>
            <span className="text-xs text-neutral-400 px-3 py-1.5 bg-neutral-800/60 rounded-full border border-cyan-500/20 font-medium">
              {reply.replies.length} alt yanıt
            </span>
            <div className="h-px bg-gradient-to-l from-cyan-500/40 to-transparent flex-1"></div>
          </div>
          <div className="space-y-4">
          {reply.replies.map((subReply, subIndex) => (
              <div key={`reply-${subReply.id}-${subIndex}`} className="relative">
                {/* Alt yanıt çizgisi */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/30 via-purple-500/15 to-transparent"></div>
                
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: subIndex * 0.1, duration: 0.4 }}
                  className={`glass rounded-xl p-5 border transition-all duration-300 ml-4 relative hover:scale-[1.01] hover:shadow-md ${
                    subReply.authorEmail === 'admin@softiel.com'
                      ? 'border-cyan-500/20 shadow-cyan-500/5 hover:border-cyan-500/30 hover:shadow-cyan-500/10'
                      : 'border-white/3 hover:border-white/8'
                  }`}
                  style={{
                    background: subReply.authorEmail === 'admin@softiel.com'
                      ? 'rgba(6, 182, 212, 0.05)'
                      : 'rgba(255, 255, 255, 0.01)',
                    boxShadow: subReply.authorEmail === 'admin@softiel.com'
                      ? '0 2px 8px rgba(6, 182, 212, 0.05)'
                      : '0 1px 4px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  {/* Alt yanıt içeriği */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center overflow-hidden ${
                        subReply.authorEmail === 'admin@softiel.com' 
                          ? 'ring-1 ring-cyan-500/30' 
                          : 'ring-1 ring-white/5'
                      }`} 
                           style={{ background: subReply.authorEmail === 'admin@softiel.com' 
                             ? 'rgba(6, 182, 212, 0.1)' 
                             : 'linear-gradient(135deg, #8b5cf6, #a855f7)' }}>
                        {subReply.authorEmail === 'admin@softiel.com' ? (
                          <img 
                            src="/transparent.webp" 
                            alt="Admin" 
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          <User className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h6 className={`font-medium text-sm ${
                            subReply.authorEmail === 'admin@softiel.com'
                              ? 'text-cyan-200'
                              : 'text-white'
                          }`}>{subReply.authorName}</h6>
                          {subReply.authorEmail === 'admin@softiel.com' ? (
                            <div className="flex items-center space-x-1 px-1.5 py-0.5 bg-cyan-500/15 rounded-full border border-cyan-500/20">
                              <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
                              <span className="text-xs text-cyan-300 font-medium">Admin</span>
                            </div>
                          ) : (
                            <span className="px-1.5 py-0.5 bg-purple-500/15 text-purple-400 text-xs rounded-full border border-purple-500/20">
                              Kullanıcı
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-neutral-500">{formatDate(subReply.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className={`text-sm leading-relaxed break-words overflow-wrap-anywhere hyphens-auto ${
                      subReply.authorEmail === 'admin@softiel.com'
                        ? 'text-cyan-100'
                        : 'text-neutral-200'
                    }`}>{subReply.content}</p>
                    {subReply.authorEmail === 'admin@softiel.com' && (
                      <div className="mt-2 inline-flex items-center space-x-1 px-2 py-1 bg-cyan-500/8 rounded-full border border-cyan-500/15">
                        <div className="w-1 h-1 bg-cyan-400 rounded-full"></div>
                        <span className="text-xs text-cyan-400 font-medium">Resmi Yanıt</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/3">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => onLike(subReply.id!)}
                        className={`flex items-center space-x-1 px-2 py-1.5 rounded-lg transition-all duration-200 ${
                          likedComments.has(subReply.id!)
                            ? 'bg-cyan-500/15 text-cyan-400'
                            : 'text-neutral-400 hover:text-cyan-400 hover:bg-cyan-500/8'
                        }`}
                      >
                        <ThumbsUp className={`h-3 w-3 ${likedComments.has(subReply.id!) ? 'fill-current' : ''}`} />
                        <span className="text-xs font-medium">{subReply.likes || 0}</span>
                      </button>
                    </div>

                    <div className="flex items-center space-x-1">
                      {!subReply.isApproved && (
                        <button
                          type="button"
                          onClick={() => onStatusChange(subReply.id!, true)}
                          className="flex items-center space-x-1 px-2 py-1 text-green-400 hover:bg-green-500/15 rounded-lg transition-all duration-200 text-xs"
                        >
                          <CheckCircle className="h-3 w-3" />
                          <span>Onayla</span>
                        </button>
                      )}

                      {!subReply.isApproved && (
                        <button
                          type="button"
                          onClick={() => onStatusChange(subReply.id!, false)}
                          className="flex items-center space-x-1 px-2 py-1 text-red-400 hover:bg-red-500/15 rounded-lg transition-all duration-200 text-xs"
                        >
                          <XCircle className="h-3 w-3" />
                          <span>Reddet</span>
                        </button>
                      )}
                      

                      {onReply && subReply.isApproved && (
                        <button
                          type="button"
                          onClick={() => onReply(subReply)}
                          className="flex items-center space-x-1 px-2 py-1 text-cyan-400 hover:bg-cyan-500/15 rounded-lg transition-all duration-200 text-xs"
                        >
                          <Reply className="h-3 w-3" />
                          <span>Yanıtla</span>
                        </button>
                      )}

                      {subReply.isApproved && (
                        <button
                          type="button"
                          onClick={() => onDelete(subReply.id!)}
                          className="flex items-center space-x-1 px-2 py-1 text-red-400 hover:bg-red-500/15 rounded-lg transition-all duration-200 text-xs"
                        >
                          <Trash2 className="h-3 w-3" />
                          <span>Sil</span>
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
    </div>
  )
}
