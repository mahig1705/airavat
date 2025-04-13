"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { FileUp, X, File, FileText, FileSpreadsheet, FileIcon as FilePdf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FileUploaderProps {
  onUpload: (files: FileList | null) => void
  maxFiles?: number
  allowedTypes?: string[]
}

export function FileUploader({
  onUpload,
  maxFiles = 5,
  allowedTypes = [".pdf", ".doc", ".docx", ".txt", ".csv", ".xls", ".xlsx"],
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList)

    // Check if adding these files would exceed the max
    if (files.length + newFiles.length > maxFiles) {
      alert(`You can only upload a maximum of ${maxFiles} files.`)
      return
    }

    setFiles((prev) => [...prev, ...newFiles])
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUpload = () => {
    // Convert files array back to FileList-like object for the onUpload callback
    const dataTransfer = new DataTransfer()
    files.forEach((file) => {
      dataTransfer.items.add(file)
    })

    onUpload(dataTransfer.files)
  }

  const getFileIcon = (file: File) => {
    const extension = file.name.split(".").pop()?.toLowerCase()

    switch (extension) {
      case "pdf":
        return <FilePdf className="h-5 w-5 text-red-500" />
      case "doc":
      case "docx":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "xls":
      case "xlsx":
      case "csv":
        return <FileSpreadsheet className="h-5 w-5 text-green-500" />
      default:
        return <File className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="w-full">
      <div
        className={cn(
          "border-2 border-dashed rounded-xl p-8 text-center transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-border",
          files.length > 0 ? "pb-4" : "",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          className="hidden"
          multiple
          accept={allowedTypes.join(",")}
        />

        <div className="flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: isDragging ? 1.1 : 1 }}
            transition={{ duration: 0.2 }}
            className="mb-4 rounded-full bg-primary/10 p-3"
          >
            <FileUp className="h-6 w-6 text-primary" />
          </motion.div>

          <h3 className="text-lg font-medium mb-2">{isDragging ? "Drop files here" : "Upload your documents"}</h3>

          <p className="text-sm text-muted-foreground mb-4">Drag and drop your files here or click to browse</p>

          <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="rounded-lg">
            Browse Files
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Supported formats: PDF, DOC, DOCX, TXT, CSV, XLS, XLSX (Max {maxFiles} files)
          </p>
        </div>

        {files.length > 0 && (
          <div className="mt-6 border-t pt-4">
            <div className="text-sm font-medium mb-2 text-left">
              Selected Files ({files.length}/{maxFiles})
            </div>
            <div className="space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-muted/50 rounded-lg p-2 text-left">
                  <div className="flex items-center gap-2 overflow-hidden">
                    {getFileIcon(file)}
                    <span className="text-sm truncate">{file.name}</span>
                    <span className="text-xs text-muted-foreground">({(file.size / 1024).toFixed(1)} KB)</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 rounded-full hover:bg-destructive/10"
                    onClick={() => removeFile(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {files.length > 0 && (
        <div className="mt-4 flex justify-end">
          <Button onClick={handleUpload} className="rounded-lg">
            Upload {files.length} {files.length === 1 ? "File" : "Files"}
          </Button>
        </div>
      )}
    </div>
  )
}
