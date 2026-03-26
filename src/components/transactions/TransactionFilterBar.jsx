import { Search } from 'lucide-react'
import Input from '../ui/Input.jsx'
import SelectField from '../ui/SelectField.jsx'

function TransactionFilterBar({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  selectedMethod,
  onMethodChange,
  statusOptions,
  paymentOptions,
}) {
  return (
    <section className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-strong)] p-4 transition-colors duration-300 sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr_0.8fr]">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[var(--app-text-soft)]">
            Cari transaksi
          </span>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--app-text-muted)]" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Cari ID, nama produk, atau pembeli..."
              className="h-11 py-3 pl-10 pr-4"
            />
          </div>
        </label>

        <SelectField
          label="Status"
          value={selectedStatus}
          onChange={(event) => onStatusChange(event.target.value)}
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectField>

        <SelectField
          label="Metode bayar"
          value={selectedMethod}
          onChange={(event) => onMethodChange(event.target.value)}
        >
          {paymentOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectField>
      </div>
    </section>
  )
}

export default TransactionFilterBar
