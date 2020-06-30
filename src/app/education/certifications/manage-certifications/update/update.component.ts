import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Certification } from '../../certification.model';
import { ToastrService } from 'ngx-toastr';
import { CertificationService } from '../../certification.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent2 implements OnInit {

  manageCertificationForm: FormGroup;
  isSaving: boolean;

  constructor(protected activatedRoute: ActivatedRoute,
              private toastr: ToastrService,
              private projectService: CertificationService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.createForm();
    this.activatedRoute.data.subscribe(({project}) => {
      this.updateForm(project);
    });
  }
    saveCertifications(): void {
      this.isSaving = true;
    if (!this.manageCertificationForm.get(['id']).value) {
      this.projectService.createCertification(this.manageCertificationForm.getRawValue()).then(data => {
          this.isSaving = false;
          this.toastr.success('New Certification successfully created', 'Success');
          this.router.navigate(['/managecertifications']);
        },
        err => {
          this.isSaving = false;
          this.toastr.error('An error occurred while saving a new certification', 'Error');
        });
    } else {
      this.projectService.updateCertification(this.manageCertificationForm.getRawValue()).then(() => {
          this.isSaving = false;
          this.toastr.success('Certification successfully updated', 'Success');
          this.router.navigate(['/managecertifications']);
        },
        err => {
          this.isSaving = false;
          this.toastr.error('An error occurred while saving a new certification', 'Error');
        });
    }
  }

    previousState(): void {
      window.history.back();
  }

    //addProjectTeamMember(): void {
    //(this.manageAcademicForm.get(['projectTeamMembers']) as FormArray).push(this.createProjectTeamMemberFormGroup());
  //}

    //deleteProjectTeamMember(index: number): void {
    //(this.manageAcademicForm.get(['projectTeamMembers']) as FormArray).removeAt(index);
  //}

    //get projectTeamMembersControls(): Array<AbstractControl> {
      //return (this.manageAcademicForm.get('projectTeamMembers') as FormArray).controls;
  //}

  private createForm() {
      this.manageCertificationForm = new FormGroup({
        id: new FormControl(''),
        certName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        issuingOrg: new FormControl('', [Validators.required, Validators.maxLength(10)]),
        expires: new FormControl('', [Validators.required]),
        issuingDate: new FormControl('', [Validators.required]),
        expireDate: new FormControl('', [Validators.required]),
        certCode: new FormControl('', [Validators.required]),
        certUrl: new FormControl('', [Validators.required,  Validators.maxLength(8)]),
      });
    }

 /* private createProjectTeamMemberFormGroup(): FormGroup {
      return new FormGroup({
        id: new FormControl(''),
        memberSpecialization: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        memberName: new FormControl('', [Validators.required, Validators.maxLength(250)]),
        startDate: new FormControl('', [Validators.required]),
        endDate: new FormControl('')
      });
    }*/

  private updateForm(certification: Certification): void {
      this.manageCertificationForm.patchValue({
        id: certification.id,
        certName: certification.certName,
        issuingOrg: certification.issuingOrg,
        expires: certification.expires,
        issuingDate: certification.issuingDate,
        expireDate: certification.expireDate,
        certCode: certification.certCode,
        certUrl: certification.certUrl,
      });
  }

    /*private createProjectTeamMemberFormArray(academic: Academic): FormGroup[] {
      const fg: FormGroup[] = [];
      if (!academic.) {
        project.projectTeamMembers = [];
      }
      project.projectTeamMembers.forEach(projectTeamMember => {
        fg.push(this.formBuilder.group({
            id: new FormControl(projectTeamMember.id),
            memberSpecialization: new FormControl(projectTeamMember.memberSpecialization, [Validators.required, Validators.maxLength(50)]),
            memberName: new FormControl(projectTeamMember.memberName, [Validators.required, Validators.maxLength(250)]),
            startDate: new FormControl(projectTeamMember.startDate, [Validators.required]),
            endDate: new FormControl(projectTeamMember.endDate)
          })
        );
      });
      return fg;
    }*/
}