export const salesCatalog = [
  { keyword: 'latte', name: 'Latte', price: 22000 },
  { keyword: 'cappuccino', name: 'Cappuccino', price: 23000 },
  { keyword: 'kopi susu', name: 'Kopi Susu Gula Aren', price: 24000 },
]

function calculateDraftTotal(items = []) {
  return items.reduce((sum, item) => sum + item.total, 0)
}

function buildDraftItem(product, quantity) {
  return {
    name: product.name,
    quantity,
    price: product.price,
    total: quantity * product.price,
  }
}

function findCatalogProductByText(text = '') {
  const normalizedText = text.toLowerCase()
  return salesCatalog.find((product) => normalizedText.includes(product.keyword)) ?? null
}

function findDraftItemIndexByText(text = '', draft) {
  const normalizedText = text.toLowerCase()

  return draft.items.findIndex((item) => {
    const normalizedName = item.name.toLowerCase()
    const catalogMatch = salesCatalog.find((product) => product.name === item.name)

    return normalizedText.includes(normalizedName) ||
      (catalogMatch ? normalizedText.includes(catalogMatch.keyword) : false)
  })
}

function rebuildDraft(draft, items, note) {
  return {
    ...draft,
    items,
    total: calculateDraftTotal(items),
    note,
  }
}

export function parseSalesInstruction(text = '') {
  const normalizedText = text.toLowerCase()

  if (
    !normalizedText.includes('jual') &&
    !normalizedText.includes('terjual') &&
    !normalizedText.includes('transaksi')
  ) {
    return null
  }

  const items = salesCatalog
    .map((product) => {
      const match = normalizedText.match(new RegExp(`(\\d+)\\s+${product.keyword}`))

      if (!match) {
        return null
      }

      return buildDraftItem(product, Number(match[1]))
    })
    .filter(Boolean)

  if (items.length === 0) {
    return null
  }

  return {
    source: 'chat',
    title: 'Draft transaksi dari chat',
    items,
    total: calculateDraftTotal(items),
    note: 'AI menyusun draft dari instruksi yang Anda ketik.',
  }
}

export function buildDraftFromScanner(product) {
  return {
    source: 'scan',
    title: 'Draft transaksi dari hasil scan',
    items: [buildDraftItem(product, 1)],
    total: product.price,
    note: `Barcode ${product.barcode} berhasil dibaca. Anda masih bisa ubah jumlah saat tahap konfirmasi.`,
  }
}

export function buildDraftFromAttachment(fileName = 'dokumen') {
  return {
    source: 'upload',
    title: 'Draft hasil upload nota',
    items: [
      {
        name: 'Bahan baku cafe dari nota',
        quantity: 1,
        price: 125000,
        total: 125000,
      },
    ],
    total: 125000,
    note: `File ${fileName} berhasil diterima. Tahap berikutnya bisa dilanjutkan ke OCR dan parsing isi nota.`,
  }
}

export function applyDraftCorrection(text = '', draft) {
  if (!draft?.items?.length) {
    return null
  }

  const normalizedText = text.toLowerCase()
  const targetIndex = findDraftItemIndexByText(normalizedText, draft)
  const defaultIndex = draft.items.length === 1 ? 0 : targetIndex

  if (normalizedText.includes('hapus')) {
    if (defaultIndex < 0) {
      return null
    }

    const removedItem = draft.items[defaultIndex]
    const nextItems = draft.items.filter((_, index) => index !== defaultIndex)

    if (nextItems.length === 0) {
      return {
        clearDraft: true,
        assistantText: `Siap, saya hapus ${removedItem.name}. Karena tidak ada item lain di draft, draft-nya saya kosongkan dulu.`,
        context: {
          modeLabel: 'Draft Diperbarui',
          description:
            'Draft aktif berubah setelah koreksi terakhir. Anda bisa membuat draft baru atau melanjutkan percakapan biasa.',
        },
      }
    }

    return {
      replaceDraft: true,
      draft: rebuildDraft(
        draft,
        nextItems,
        `Item ${removedItem.name} dihapus dari draft sesuai koreksi terbaru.`,
      ),
      assistantText: `Siap, saya hapus ${removedItem.name} dari draft. Silakan cek versi terbarunya di bawah.`,
      context: {
        modeLabel: 'Draft Diperbarui',
        description:
          'Draft aktif sudah diperbarui sesuai koreksi terakhir dari percakapan.',
      },
    }
  }

  const setQuantityMatch = normalizedText.match(/(?:jadi|menjadi)\s+(\d+)/)
  if (setQuantityMatch && defaultIndex >= 0) {
    const nextQuantity = Number(setQuantityMatch[1])
    const targetItem = draft.items[defaultIndex]
    const nextItems = draft.items.map((item, index) =>
      index === defaultIndex
        ? {
            ...item,
            quantity: nextQuantity,
            total: item.price * nextQuantity,
          }
        : item,
    )

    return {
      replaceDraft: true,
      draft: rebuildDraft(
        draft,
        nextItems,
        `Jumlah ${targetItem.name} diperbarui menjadi ${nextQuantity} item sesuai koreksi terbaru.`,
      ),
      assistantText: `Siap, saya ubah ${targetItem.name} menjadi ${nextQuantity} item. Draft terbaru sudah saya perbarui di bawah.`,
      context: {
        modeLabel: 'Draft Diperbarui',
        description:
          'Draft aktif sudah diperbarui sesuai koreksi terakhir dari percakapan.',
      },
    }
  }

  const addQuantityMatch = normalizedText.match(/tambah\s+(\d+)/)
  const matchedProduct = findCatalogProductByText(normalizedText)
  if (addQuantityMatch && matchedProduct) {
    const quantityToAdd = Number(addQuantityMatch[1])
    const existingIndex = draft.items.findIndex((item) => item.name === matchedProduct.name)
    const nextItems = [...draft.items]

    if (existingIndex >= 0) {
      const existingItem = nextItems[existingIndex]
      const nextQuantity = existingItem.quantity + quantityToAdd
      nextItems[existingIndex] = {
        ...existingItem,
        quantity: nextQuantity,
        total: existingItem.price * nextQuantity,
      }
    } else {
      nextItems.push(buildDraftItem(matchedProduct, quantityToAdd))
    }

    return {
      replaceDraft: true,
      draft: rebuildDraft(
        draft,
        nextItems,
        `Draft diperbarui dengan tambahan ${quantityToAdd} ${matchedProduct.name}.`,
      ),
      assistantText: `Siap, saya tambahkan ${quantityToAdd} ${matchedProduct.name} ke draft. Silakan cek hasil terbarunya di bawah.`,
      context: {
        modeLabel: 'Draft Diperbarui',
        description:
          'Draft aktif sudah diperbarui sesuai koreksi terakhir dari percakapan.',
      },
    }
  }

  return null
}

export function summarizeDraftItems(items = []) {
  return items.map((item) => `${item.quantity} ${item.name}`).join(', ')
}
