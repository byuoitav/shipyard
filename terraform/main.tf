terraform {
  backend "s3" {
    bucket     = "terraform-state-storage-586877430255"
    lock_table = "terraform-state-lock-586877430255"
    region     = "us-west-2"

    // THIS MUST BE UNIQUE
    key = "shipyard.tfstate"
  }
}

provider "aws" {
  region = "us-west-2"
}

data "aws_ssm_parameter" "eks_cluster_endpoint" {
  name = "/eks/av-cluster-endpoint"
}

provider "kubernetes" {
  host = data.aws_ssm_parameter.eks_cluster_endpoint.value
}

data "aws_ssm_parameter" "opa_url" {
  name = "/env/opa-url"
}

data "aws_ssm_parameter" "opa_token" {
  name = "/env/shipyard/opa-token"
}

data "aws_ssm_parameter" "db_address" {
  name = "/env/couch-address-new"
}

data "aws_ssm_parameter" "db_user" {
  name = "/env/couch-username"
}

data "aws_ssm_parameter" "db_pass" {
  name = "/env/couch-password"
}

data "aws_ssm_parameter" "client_id" {
  name = "/env/shipyard/client-id"
}

data "aws_ssm_parameter" "client_secret" {
  name = "/env/shipyard/client-secret"
}

data "aws_ssm_parameter" "gateway_url" {
  name = "/env/gateway-url"
}

module "shipyard_prd" {
  source = "github.com/byuoitav/terraform//modules/kubernetes-deployment"

  // required
  name           = "shipyard-prd"
  image          = "docker.pkg.github.com/byuoitav/shipyard/shipyard-dev"
  image_version  = "58ad182"
  container_port = 80
  repo_url       = "https://github.com/byuoitav/shipyard"

  // optional
  image_pull_secret = "github-docker-registry"
  public_urls       = ["shipyard.av.byu.edu"]
  container_args = [
    "--opa-url", data.aws_ssm_parameter.opa_url.value,
    "--opa-token", data.aws_ssm_parameter.opa_token.value,
    "--db-address", data.aws_ssm_parameter.db_address.value,
    "--db-username", data.aws_ssm_parameter.db_user.value,
    "--db-password", data.aws_ssm_parameter.db_pass.value,
    "--callback-url", "https://shipyard.av.byu.edu",
    "--client-id", data.aws_ssm_parameter.client_id.value,
    "--client-secret", data.aws_ssm_parameter.client_secret.value,
    "--gateway-url", data.aws_ssm_parameter.gateway_url.value,
  ]
}
