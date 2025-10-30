variable "resource_group_name" {
  description = "Resource group name"
  type        = string
  default     = "todo-devops-rg"
}

variable "location" {
  description = "Azure region"
  type        = string
  default     = "eastus"
}

variable "acr_name" {
  description = "Azure Container Registry name"
  type        = string
  default     = "tododevopsacr1761680890"
}

variable "aks_cluster_name" {
  description = "AKS cluster name"
  type        = string
  default     = "todo-aks-cluster"
}

variable "node_count" {
  description = "Number of AKS nodes"
  type        = number
  default     = 2
}

variable "vm_size" {
  description = "VM size for AKS nodes"
  type        = string
  default     = "Standard_DS2_v2"
}
