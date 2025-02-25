import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBarComponent } from './search-bar.component';
import { FormsModule } from '@angular/forms'; // Necesitar pentru ngModel
import { CommonModule } from '@angular/common'; // Necesitar pentru CommonModule

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent, FormsModule, CommonModule]  // Adăugăm modulele necesare
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search term when onSearch is called', () => {
    spyOn(component.search, 'emit'); 

    component.searchTerm = 'test';
    component.onSearch();  

    expect(component.search.emit).toHaveBeenCalledWith('test');  
  });
});
