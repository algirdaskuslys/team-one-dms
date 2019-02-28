package com.dmsproject.dms.controllers;

import com.dmsproject.dms.Constants;
import com.dmsproject.dms.dao.DocTypesDAO;
import com.dmsproject.dms.dao.DocumentDAO;
import com.dmsproject.dms.dto.DocTypes;
import com.dmsproject.dms.dto.Document;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController()
@CrossOrigin(origins = Constants.REACT_URL)
public class DocumentTypesController {
    @RequestMapping(value = "/documentTypes/get", method = RequestMethod.GET, produces = "application/json")
    public List<DocTypes> getDocTypes() {
        return DocTypesDAO.getDocTypes();
    }


    @RequestMapping(value = "/documentTemplate/add", method = RequestMethod.POST)
    public Boolean add(@RequestParam(name = "description") String description,
                       @RequestParam(name = "template") String template) {
        DocTypes docTypes = new DocTypes();
        docTypes.setDescription(description);
        docTypes.setTemplate(template);

        return DocTypesDAO.addDocTemplate(docTypes);
    }

    @RequestMapping(value = "/documentTemplate/edit", method = RequestMethod.POST)
    public void edit(@RequestParam(name = "id") Integer id,
            @RequestParam(name = "description") String description,
                     @RequestParam(name = "template") String template) {
        DocTypes docTypes = new DocTypes();
        docTypes.setId(id);
        docTypes.setDescription(description);
        docTypes.setTemplate(template);

        DocTypesDAO.editDocTemplate(docTypes);
    }

    @RequestMapping(value = "/documentTemplate/delete", method = RequestMethod.DELETE)
    public void delete(@RequestParam(name = "docTypeId") Integer docTypeId) {
        DocTypesDAO.deleteTemplate(docTypeId);
    }
}

