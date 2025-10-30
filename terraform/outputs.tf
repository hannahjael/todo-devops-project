output "resource_group_name" {
  description = "Resource group name"
  value       = data.azurerm_resource_group.main.name
}

output "acr_login_server" {
  description = "ACR login server"
  value       = data.azurerm_container_registry.acr.login_server
}

output "aks_cluster_name" {
  description = "AKS cluster name"
  value       = azurerm_kubernetes_cluster.aks.name
}

output "aks_cluster_id" {
  description = "AKS cluster ID"
  value       = azurerm_kubernetes_cluster.aks.id
}

output "aks_kube_config_cmd" {
  description = "Command to get AKS credentials"
  value       = "az aks get-credentials --resource-group ${data.azurerm_resource_group.main.name} --name ${azurerm_kubernetes_cluster.aks.name}"
}

output "acr_name" {
  description = "ACR name"
  value       = data.azurerm_container_registry.acr.name
}
