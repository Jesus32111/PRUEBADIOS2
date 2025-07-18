import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Alert title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Alert description is required'],
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  type: {
    type: String,
    enum: [
      'Mantenimiento',
      'SOAT Vencido',
      'Revisión Técnica',
      'Stock Bajo',
      'Sin Stock',
      'Herramienta Dañada',
      'Vehículo Fuera de Servicio',
      'Pago Pendiente',
      'Documento Vencido',
      'Manual',
      'Otro'
    ],
    required: [true, 'Alert type is required']
  },
  priority: {
    type: String,
    enum: ['Baja', 'Media', 'Alta', 'Crítica'],
    default: 'Media'
  },
  status: {
    type: String,
    enum: ['Activa', 'Resuelta', 'Descartada'],
    default: 'Activa'
  },
  sourceType: {
    type: String,
    enum: ['Vehicle', 'Machinery', 'Tool', 'Part', 'Rental', 'Manual'],
    required: true
  },
  sourceId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'sourceType'
  },
  sourceName: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date
  },
  resolvedDate: {
    type: Date
  },
  resolvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  resolvedNotes: {
    type: String,
    maxlength: [500, 'Resolved notes cannot be more than 500 characters']
  },
  autoGenerated: {
    type: Boolean,
    default: false
  },
  metadata: {
    expirationDate: Date,
    currentStock: Number,
    minimumStock: Number,
    amount: Number,
    vehiclePlate: String,
    partNumber: String,
    toolCode: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  collection: 'alerts'
});

// Indexes for better performance
alertSchema.index({ status: 1 });
alertSchema.index({ type: 1 });
alertSchema.index({ priority: 1 });
alertSchema.index({ dueDate: 1 });
alertSchema.index({ createdBy: 1 });
alertSchema.index({ sourceType: 1, sourceId: 1 });
alertSchema.index({ createdAt: -1 });

// Virtual for checking if alert is overdue
alertSchema.virtual('isOverdue').get(function() {
  if (!this.dueDate || this.status !== 'Activa') return false;
  return new Date() > this.dueDate;
});

// Virtual for days until due
alertSchema.virtual('daysUntilDue').get(function() {
  if (!this.dueDate || this.status !== 'Activa') return null;
  const now = new Date();
  const due = new Date(this.dueDate);
  const diffTime = due.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Ensure virtual fields are serialized
alertSchema.set('toJSON', { virtuals: true });

const Alert = mongoose.model('Alert', alertSchema);

export default Alert;