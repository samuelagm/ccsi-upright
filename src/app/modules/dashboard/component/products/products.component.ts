import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../../services/products.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  productForm: FormGroup;
  productData: any = {};
  selectedProduct: any = {};
  productCreate: boolean;
  loading: boolean;
  state: string;
  constructor(private service: ProductsService, private builder: FormBuilder) {
    this.productCreate = false;
    this.loading = true;
    this.state = "default";
    this.productForm = builder.group({
      name: ["", Validators.required],
      points: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(/\d+/),
          Validators.min(0)
        ])
      ],
      image: [""],
      rating: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(/\d/),
          Validators.max(5),
          Validators.min(0)
        ])
      ],
      delivery: ["", Validators.required]
    });
  }

  delProduct() {
    let del = confirm("Do you wish to delete this product");
    if (del) {
      this.loading = true;
      this.service.deleteProduct(this.selectedProduct.id).subscribe(
        res => {
          this.loading = false;
          this.productData.products.splice(
            this.productData.products.indexOf(this.selectedProduct),
            1
          );
          this.closeModal();
        },
        err => {
          console.dir(err);
          alert("A network error occured and the product could not be deleted");
          this.loading = false;
        }
      );
    }
  }

  closeModal() {
    this.productCreate = false;
    this.productForm.reset();
    this.selectedProduct = "";
    this.state = "default";
  }

  getProducts() {
    this.loading = true;
    this.service.getProducts().subscribe(
      res => {
        this.loading = false;
        this.productData = res;
      },
      err => {
        this.loading = false;
        alert(
          "Ooop a network error occcured and products couldn't be retrieved"
        );
        console.dir(err);
      }
    );
  }

  ngOnInit() {
    this.getProducts();
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.loading = true;
      const req =
        this.state === "edit"
          ? this.service.updateProducts(
              this.selectedProduct.id,
              this.productForm.value
            )
          : this.service.createProduct(this.productForm.value);
      req.subscribe(
        data => {
          this.loading = false;
          if (this.state === "edit") {
            this.productData.products[
              this.productData.products.indexOf(this.selectedProduct)
            ] = Object.assign(this.selectedProduct, this.productForm.value);
          } else {
            this.productData.products.unshift(
              Object.assign(data, { orders: [], order: 0 })
            );
          }
          this.closeModal();
        },
        err => {
          this.loading = false;
          console.dir(err);
          alert(
            `Ooops a network error occcured and we couldn't ${this.state} product`
          );
        }
      );
    } else {
      alert("The submitted form is invalid, note that all fields are required");
    }
  }

  public handleFile(files: FileList) {
    if (files.length) {
      const file = files[0];
      const fileSizeInMb = file.size / (1024 * 1024);
      console.log(file.type);
      if (!/^(image|audio|video)/.test(file.type)) {
        alert("File is not a media file");
        return;
      }

      if (fileSizeInMb > 0.5) {
        alert("File size greater than 500 kb");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.productForm.controls.image.setValue(reader.result as string);
      };
    }
  }

  toggleCreateState(type: string, product: any = {}) {
    this.productCreate = !this.productCreate;
    this.state = type;
    if (this.productCreate) {
      if (type === "edit") {
        if (this.selectedProduct !== product) {
          this.selectedProduct = product;
          this.productForm.reset();
          this.productForm.controls.name.setValue(product.name);
          this.productForm.controls.rating.setValue(product.rating);
          this.productForm.controls.image.setValue(product.image);
          this.productForm.controls.points.setValue(product.points);
          this.productForm.controls.delivery.setValue(product.delivery);
        }
      } else {
        this.selectedProduct = "";
        this.productForm.reset();
      }
      setTimeout(() => {
        const elem = document.querySelector(".drop-area");
        elem.addEventListener("click", e => {
          var fileInput = document.createElement("input") as HTMLInputElement;
          fileInput.type = "file";
          fileInput.accept = "image/*";
          fileInput.multiple = false;
          fileInput.click();
          fileInput.addEventListener("input", e => {
            e.preventDefault();
            e.stopPropagation();
            this.handleFile(fileInput.files);
          });
        });
      }, 500);
    } else {
      this.state = "default";
    }
  }
}
