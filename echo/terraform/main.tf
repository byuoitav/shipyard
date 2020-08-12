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
  name = "/env/couch-address_new"
}

data "aws_ssm_parameter" "db_user" {
  name = "/env/couch-username"
}

data "aws_ssm_parameter" "db_pass" {
  name = "/env/couch-password"
}

module "shipyard_prd" {
  source = "github.com/byuoitav/terraform//modules/kubernetes-deployment"

  // required
  name           = "shipyard-prd"
  image          = "byuoitav/shipyard"
  image_version  = ""
  container_port = 80
  repo_url       = "https://github.com/byuoitav/shipyard"

  // optional
  public_urls = ["shipyard.av.byu.edu"]
  container_args = [
    "--opa-url", data.aws_ssm_parameter.opa_url.value,
    "--opa-token", data.aws_ssm_parameter.opa_token.value,
    "--db-address", data.aws_ssm_parameter.db_address.value,
    "--db-username", data.aws_ssm_parameter.db_user.value,
    "--db-password", data.aws_ssm_parameter.db_pass.value,
  ]
}
