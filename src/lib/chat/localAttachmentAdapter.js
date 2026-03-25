export function createLocalAttachmentAdapter() {
  const objectUrls = new Map()

  return {
    accept: 'image/*,application/pdf,.txt,.csv,.doc,.docx',
    async add(file) {
      const objectUrl = URL.createObjectURL(file)
      const attachmentId = `${file.name}-${crypto.randomUUID()}`

      objectUrls.set(attachmentId, objectUrl)

      const type = file.type.startsWith('image/')
        ? 'image'
        : file.type === 'application/pdf'
          ? 'document'
          : 'file'

      return {
        id: attachmentId,
        type,
        name: file.name,
        content: [{ type, [type === 'image' ? 'image' : 'url']: objectUrl }],
      }
    },
    async remove(attachment) {
      const objectUrl = objectUrls.get(attachment.id)

      if (objectUrl) {
        URL.revokeObjectURL(objectUrl)
        objectUrls.delete(attachment.id)
      }
    },
  }
}
