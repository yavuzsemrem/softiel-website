'use client'

import React, { useState, useRef, useEffect } from 'react'
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough,
  Code,
  Link,
  Image,
  List,
  ListOrdered,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Type,
  Palette,
  Undo,
  Redo,
  Eye,
  Code2,
  Save,
  Download,
  Upload,
  X,
  Globe,
  Monitor
} from 'lucide-react'

interface HtmlEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export default function HtmlEditor({ 
  value, 
  onChange, 
  placeholder = "İçeriğinizi HTML olarak yazın...",
  className = ""
}: HtmlEditorProps) {
  const [isPreview, setIsPreview] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [showImageModal, setShowImageModal] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [imageAlt, setImageAlt] = useState("")
  const [imageWidth, setImageWidth] = useState("100%")
  const [imageHeight, setImageHeight] = useState("auto")
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // History management
  const saveToHistory = (newValue: string) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(newValue)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      onChange(history[newIndex])
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      onChange(history[newIndex])
    }
  }

  // HTML formatting functions
  const insertTag = (openTag: string, closeTag: string = '') => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const newText = value.substring(0, start) + openTag + selectedText + closeTag + value.substring(end)
    
    saveToHistory(newText)
    onChange(newText)
    
    // Restore cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + openTag.length, start + openTag.length + selectedText.length)
    }, 0)
  }

  const insertHtml = (html: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const newText = value.substring(0, start) + html + value.substring(start)
    
    saveToHistory(newText)
    onChange(newText)
    
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + html.length, start + html.length)
    }, 0)
  }

  const handleImageFromUrl = () => {
    if (!imageUrl.trim()) return
    
    const imgHtml = `<img src="${imageUrl}" alt="${imageAlt || 'Resim'}" style="max-width: ${imageWidth}; height: ${imageHeight};" />`
    insertHtml(imgHtml)
    setShowImageModal(false)
    setImageUrl("")
    setImageAlt("")
    setImageWidth("100%")
    setImageHeight("auto")
  }

  const handleImageFromFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Dosya boyutu kontrolü (10MB - Cloudinary limiti)
    if (file.size > 10 * 1024 * 1024) {
      alert('Dosya boyutu 10MB\'dan büyük olamaz!')
      return
    }

    // Dosya tipi kontrolü
    if (!file.type.startsWith('image/')) {
      alert('Sadece resim dosyaları yüklenebilir!')
      return
    }

    try {
      // Cloudinary'ye yükle
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'softiel-uploads')
      formData.append('cloud_name', 'dwban9dgy')
      
      const response = await fetch(`https://api.cloudinary.com/v1_1/dwban9dgy/image/upload`, {
        method: 'POST',
        body: formData
      })
      
      const data = await response.json()
      
      if (data.secure_url) {
        // Kısa URL ile HTML oluştur
        const imgHtml = `<img src="${data.secure_url}" alt="${imageAlt || file.name}" style="max-width: ${imageWidth}; height: ${imageHeight};" title="${file.name}" />`
        insertHtml(imgHtml)
        setShowImageModal(false)
        setImageAlt("")
        setImageWidth("100%")
        setImageHeight("auto")
      } else {
        alert('Resim yüklenemedi: ' + (data.error?.message || 'Bilinmeyen hata'))
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Resim yüklenirken hata oluştu!')
    }
  }

  const openImageModal = () => {
    setShowImageModal(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Tab indentation
    if (e.key === 'Tab') {
      e.preventDefault()
      const textarea = textareaRef.current
      if (!textarea) return

      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const newText = value.substring(0, start) + '  ' + value.substring(end)
      
      saveToHistory(newText)
      onChange(newText)
      
      setTimeout(() => {
        textarea.setSelectionRange(start + 2, start + 2)
      }, 0)
    }

    // Undo/Redo shortcuts
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        undo()
      } else if (e.key === 'y' || (e.key === 'z' && e.shiftKey)) {
        e.preventDefault()
        redo()
      } else if (e.key === 's') {
        e.preventDefault()
        // Save functionality can be added here
      }
    }
  }

  // Auto-save to history on change
  useEffect(() => {
    if (value !== history[historyIndex]) {
      saveToHistory(value)
    }
  }, [value])

  const formatButtons = [
    { icon: Bold, action: () => insertTag('<strong>', '</strong>'), title: 'Kalın (Ctrl+B)' },
    { icon: Italic, action: () => insertTag('<em>', '</em>'), title: 'İtalik (Ctrl+I)' },
    { icon: Underline, action: () => insertTag('<u>', '</u>'), title: 'Altı Çizili' },
    { icon: Strikethrough, action: () => insertTag('<s>', '</s>'), title: 'Üstü Çizili' },
    { icon: Code, action: () => insertTag('<code>', '</code>'), title: 'Kod' },
  ]

  const headingButtons = [
    { label: 'H1', action: () => insertTag('<h1>', '</h1>'), title: 'Başlık 1' },
    { label: 'H2', action: () => insertTag('<h2>', '</h2>'), title: 'Başlık 2' },
    { label: 'H3', action: () => insertTag('<h3>', '</h3>'), title: 'Başlık 3' },
    { label: 'H4', action: () => insertTag('<h4>', '</h4>'), title: 'Başlık 4' },
    { label: 'H5', action: () => insertTag('<h5>', '</h5>'), title: 'Başlık 5' },
    { label: 'H6', action: () => insertTag('<h6>', '</h6>'), title: 'Başlık 6' },
  ]

  const listButtons = [
    { icon: List, action: () => insertHtml('<ul>\n<li>Madde 1</li>\n<li>Madde 2</li>\n</ul>'), title: 'Madde Listesi' },
    { icon: ListOrdered, action: () => insertHtml('<ol>\n<li>Madde 1</li>\n<li>Madde 2</li>\n</ol>'), title: 'Numaralı Liste' },
  ]

  const alignmentButtons = [
    { icon: AlignLeft, action: () => insertTag('<div style="text-align: left;">', '</div>'), title: 'Sola Hizala' },
    { icon: AlignCenter, action: () => insertTag('<div style="text-align: center;">', '</div>'), title: 'Ortala' },
    { icon: AlignRight, action: () => insertTag('<div style="text-align: right;">', '</div>'), title: 'Sağa Hizala' },
    { icon: AlignJustify, action: () => insertTag('<div style="text-align: justify;">', '</div>'), title: 'İki Yana Yasla' },
  ]

  const specialButtons = [
    { icon: Quote, action: () => insertTag('<blockquote>', '</blockquote>'), title: 'Alıntı' },
    { icon: Link, action: () => insertTag('<a href="https://example.com">', '</a>'), title: 'Link Ekle' },
    { icon: Image, action: openImageModal, title: 'Resim Ekle' },
  ]

  return (
    <div className={`bg-gray-900 border border-gray-700 rounded-lg overflow-hidden ${className}`}>
      {/* Toolbar */}
      <div className="bg-gray-800 border-b border-gray-700 p-3">
        <div className="flex flex-wrap gap-2">
          {/* Undo/Redo */}
          <div className="flex border-r border-gray-600 pr-2 mr-2">
            <button
              type="button"
              onClick={undo}
              disabled={historyIndex <= 0}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              title="Geri Al (Ctrl+Z)"
            >
              <Undo size={16} />
            </button>
            <button
              type="button"
              onClick={redo}
              disabled={historyIndex >= history.length - 1}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              title="İleri Al (Ctrl+Y)"
            >
              <Redo size={16} />
            </button>
          </div>

          {/* Format Buttons */}
          <div className="flex border-r border-gray-600 pr-2 mr-2">
            {formatButtons.map((button, index) => (
              <button
                key={index}
                type="button"
                onClick={button.action}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded"
                title={button.title}
              >
                <button.icon size={16} />
              </button>
            ))}
          </div>

          {/* Heading Buttons */}
          <div className="flex border-r border-gray-600 pr-2 mr-2">
            {headingButtons.map((button, index) => (
              <button
                key={index}
                type="button"
                onClick={button.action}
                className="px-2 py-1 text-xs text-gray-400 hover:text-white hover:bg-gray-700 rounded"
                title={button.title}
              >
                {button.label}
              </button>
            ))}
          </div>

          {/* List Buttons */}
          <div className="flex border-r border-gray-600 pr-2 mr-2">
            {listButtons.map((button, index) => (
              <button
                key={index}
                type="button"
                onClick={button.action}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded"
                title={button.title}
              >
                <button.icon size={16} />
              </button>
            ))}
          </div>

          {/* Alignment Buttons */}
          <div className="flex border-r border-gray-600 pr-2 mr-2">
            {alignmentButtons.map((button, index) => (
              <button
                key={index}
                type="button"
                onClick={button.action}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded"
                title={button.title}
              >
                <button.icon size={16} />
              </button>
            ))}
          </div>

          {/* Special Buttons */}
          <div className="flex border-r border-gray-600 pr-2 mr-2">
            {specialButtons.map((button, index) => (
              <button
                key={index}
                type="button"
                onClick={button.action}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded"
                title={button.title}
              >
                <button.icon size={16} />
              </button>
            ))}
          </div>

          {/* Preview Toggle */}
          <div className="flex">
            <button
              type="button"
              onClick={() => setIsPreview(!isPreview)}
              className={`p-2 rounded flex items-center gap-1 ${
                isPreview 
                  ? 'text-blue-400 bg-blue-900/30' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
              title={isPreview ? 'HTML Düzenleme' : 'Önizleme'}
            >
              {isPreview ? <Code2 size={16} /> : <Eye size={16} />}
              <span className="text-xs">{isPreview ? 'HTML' : 'Önizleme'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Editor Area */}
      <div className="relative">
        {isPreview ? (
          <div
            className="min-h-[400px] p-4 prose prose-lg max-w-none text-white bg-gray-800"
            dangerouslySetInnerHTML={{ __html: value || '<p class="text-gray-500">Önizleme için içerik girin...</p>' }}
          />
        ) : (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full min-h-[400px] p-4 bg-gray-800 text-white placeholder-gray-500 border-0 focus:outline-none resize-none font-mono text-sm leading-relaxed"
            style={{ fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace' }}
          />
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-800 border-t border-gray-700 px-4 py-2 text-xs text-gray-400 flex justify-between items-center">
        <div>
          {isPreview ? 'Önizleme Modu' : 'HTML Düzenleme Modu'}
        </div>
        <div className="flex items-center gap-4">
          <span>Satır: {value.split('\n').length}</span>
          <span>Karakter: {value.length}</span>
          <span>Kelime: {value.split(/\s+/).filter(word => word.length > 0).length}</span>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Resim Ekle</h3>
              <button
                onClick={() => setShowImageModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {/* URL ile ekleme */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">URL ile Ekle</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleImageFromUrl}
                    disabled={!imageUrl.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Globe size={16} />
                    Ekle
                  </button>
                </div>
              </div>

              {/* Dosyadan ekleme */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Dosyadan Ekle</label>
                <div className="flex gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageFromFile}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                  >
                    <Monitor size={16} />
                    Dosya Seç
                  </button>
                </div>
              </div>

              {/* Resim ayarları */}
              <div className="space-y-3 pt-4 border-t border-gray-600">
                <h4 className="text-sm font-medium text-gray-300">Resim Ayarları</h4>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Alt Metin</label>
                    <input
                      type="text"
                      value={imageAlt}
                      onChange={(e) => setImageAlt(e.target.value)}
                      placeholder="Resim açıklaması"
                      className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Genişlik</label>
                    <input
                      type="text"
                      value={imageWidth}
                      onChange={(e) => setImageWidth(e.target.value)}
                      placeholder="100%"
                      className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Yükseklik</label>
                  <input
                    type="text"
                    value={imageHeight}
                    onChange={(e) => setImageHeight(e.target.value)}
                    placeholder="auto"
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

